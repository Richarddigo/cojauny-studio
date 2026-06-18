import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { sanitizeHeader } from "@/lib/email";
import { buildContactAdminEmail, buildContactUserEmail } from "@/lib/email/templates";
import { upstashRatelimit } from "@/lib/ratelimit";

export const runtime = "nodejs";

const schema = z.object({
  name:    z.string().min(1).max(120),
  email:   z.string().email().max(254),
  type:    z.enum(["app", "web", "consulting", "other"]),
  message: z.string().min(20).max(4000),
  locale:  z.enum(["en", "es", "de", "fr"]).optional().default("en"),
  company: z.string().max(0).optional().or(z.literal("")),
  cfTurnstileResponse: z.string().optional(),
});

const rateLimit = new Map<string, number[]>();
const WINDOW_MS  = 60_000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimit.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) return true;
  timestamps.push(now);
  rateLimit.set(ip, timestamps);
  if (rateLimit.size > 5_000) {
    for (const [key, ts] of rateLimit) {
      const fresh = ts.filter((t) => now - t < WINDOW_MS);
      if (fresh.length === 0) rateLimit.delete(key);
      else rateLimit.set(key, fresh);
    }
  }
  return false;
}

const ALLOWED_ORIGINS = new Set([
  "https://studio.cojauny.com",
  "https://www.studio.cojauny.com",
  ...(process.env.NODE_ENV !== "production"
    ? [
        "http://localhost:3000", "http://127.0.0.1:3000",
        "http://localhost:3001", "http://127.0.0.1:3001",
        "http://localhost:3002", "http://127.0.0.1:3002",
      ]
    : []),
]);

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (upstashRatelimit) {
    const { success } = await upstashRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  } else if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 422 });
  }

  if (parsed.data.company && parsed.data.company.length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { name, email, type, message, locale, cfTurnstileResponse } = parsed.data;

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!cfTurnstileResponse) {
      return NextResponse.json({ error: "Bot verification required." }, { status: 400 });
    }
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: cfTurnstileResponse,
          remoteip: ip,
        }),
      }
    );
    const verifyData = await verifyRes.json() as { success: boolean };
    if (!verifyData.success) {
      return NextResponse.json({ error: "Bot verification failed. Please try again." }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not configured.");
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const adminEmail = buildContactAdminEmail({ name, email, type, message, locale });

  try {
    await resend.emails.send({
      from: "Cojauny Studio <noreply@cojauny.com>",
      to:   ["studio@cojauny.com"],
      replyTo: sanitizeHeader(email),
      subject: sanitizeHeader(adminEmail.subject),
      html: adminEmail.html,
    });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  const userEmail = buildContactUserEmail(name, message, locale);
  try {
    await resend.emails.send({
      from: "Cojauny Studio <noreply@cojauny.com>",
      to: email,
      subject: sanitizeHeader(userEmail.subject),
      html: userEmail.html,
    });
  } catch (err) {
    console.error("[contact] user confirmation email error:", err);
  }

  const segmentId = process.env.RESEND_SEGMENT_STUDIO;
  if (segmentId) {
    try {
      await resend.contacts.create({
        email,
        firstName: name.split(" ")[0] ?? name,
        lastName: name.split(" ").slice(1).join(" ") || undefined,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      });
    } catch (err) {
      console.error("[contact] Resend contacts error:", err);
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
