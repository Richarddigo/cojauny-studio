import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Lightweight liveness probe. Returns 200 with build/runtime metadata.
 * Suitable for uptime monitors and platform health checks.
 */
export function GET() {
    return NextResponse.json(
        {
            status: "ok",
            service: "cojauny-studio",
            timestamp: new Date().toISOString(),
            commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
            region: process.env.VERCEL_REGION ?? null,
        },
        {
            status: 200,
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        }
    );
}
