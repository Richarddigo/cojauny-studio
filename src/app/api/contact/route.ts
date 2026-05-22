import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { escapeHtml, sanitizeHeader } from "@/lib/email";
import { upstashRatelimit } from "@/lib/ratelimit";

export const runtime = "nodejs";

const schema = z.object({
  name:    z.string().min(1).max(120),
  email:   z.string().email().max(254),
  type:    z.enum(["app", "web", "consulting", "other"]),
  message: z.string().min(20).max(4000),
  // Honeypot — must be empty. Bots fill all visible inputs.
  company: z.string().max(0).optional().or(z.literal("")),
});

// Rate-limit primitive — per-process in-memory store (good enough for hobby scale)
// NOTE: For production at scale, swap for Upstash Ratelimit / Redis.
const rateLimit = new Map<string, number[]>();
const WINDOW_MS  = 60_000; // 1 minute
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimit.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) return true;
  timestamps.push(now);
  rateLimit.set(ip, timestamps);
  // Opportunistic GC to bound memory.
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
    ? ["http://localhost:3000", "http://127.0.0.1:3000"]
    : []),
]);

export async function POST(req: NextRequest) {
  // Origin / same-site check (cheap CSRF defence for fetch POSTs).
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // Rate limiting — Upstash (distributed) when configured, in-memory fallback otherwise.
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

  // Parse + validate
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

  // Honeypot: silently succeed without sending email when filled.
  if (parsed.data.company && parsed.data.company.length > 0) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { name, email, type, message } = parsed.data;

  // Send via Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not configured.");
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  const typeLabels: Record<string, string> = {
    app:        "App Development",
    web:        "Web Development",
    consulting: "Technical Consulting",
    other:      "Other",
  };

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; padding: 32px; background: #0C1120; color: #F1F5F9; border-radius: 12px;">
      <div style="margin-bottom: 24px;">
        <span style="font-size: 12px; color: #5B7BFF; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">New enquiry via Cojauny Studio</span>
        <h1 style="font-size: 22px; font-weight: 700; margin: 8px 0 0; color: #F1F5F9;">${escapeHtml(name)}</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #94A3B8; font-size: 13px; width: 130px; vertical-align: top;">Email</td>
          <td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${escapeHtml(email)}" style="color: #5B7BFF;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94A3B8; font-size: 13px;">Project type</td>
          <td style="padding: 8px 0; font-size: 13px;">${escapeHtml(typeLabels[type])}</td>
        </tr>
      </table>
      <div style="background: #1C2336; border-radius: 8px; padding: 16px; border: 1px solid rgba(255,255,255,0.07);">
        <p style="font-size: 12px; color: #5B7BFF; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 10px;">Message</p>
        <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #475569;">Sent from studio.cojauny.com contact form</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Cojauny Studio <noreply@cojauny.com>",
      to:   ["studio@cojauny.com"],
      replyTo: sanitizeHeader(email),
      subject: sanitizeHeader(`[Studio] New enquiry from ${name} — ${typeLabels[type]}`),
      html,
    });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
