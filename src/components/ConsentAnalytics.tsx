"use client";
import { Analytics, type BeforeSend } from "@vercel/analytics/react";
import { hasAnalyticsConsent, useConsent } from "@/hooks/useConsent";

// The installed SDK can outlive this React component. Every future event checks
// the current decision, including revocation, deletion and cross-tab changes.
const beforeSend: BeforeSend = (event) =>
    hasAnalyticsConsent() ? event : null;
export default function ConsentAnalytics() {
    const { consent } = useConsent();
    return consent === "accepted" ? (
        <Analytics beforeSend={beforeSend} />
    ) : null;
}
