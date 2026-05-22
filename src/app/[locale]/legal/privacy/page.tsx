import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalLayout, H2, P, MailLink, ExternalLink } from "@/components/legal/LegalLayout";
import { buildAlternates } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "legal" });
    return {
        title: t("privacy.title"),
        alternates: buildAlternates(locale, "/legal/privacy"),
    };
}

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "legal" });

    return (
        <LegalLayout
            title={t("privacy.title")}
            subtitle={t("privacy.subtitle")}
            backLabel={t("back")}
        >
            <H2>1. Controller</H2>
            <P>
                The controller responsible for data processing on this website is:<br />
                [Your full legal name], [Address] — <MailLink email="studio@cojauny.com" />
            </P>

            <H2>2. Data we collect</H2>
            <P>
                <strong className="text-text/80">Contact form:</strong> When you submit the contact form
                we collect your name, email address, project type, and message. This data is used solely to
                respond to your enquiry (legal basis: Art. 6(1)(b) GDPR — contractual necessity /
                pre-contractual measures).
            </P>
            <P>
                <strong className="text-text/80">Analytics:</strong> We use Vercel Analytics, a
                privacy-first analytics tool that does not use cookies and does not store personally
                identifiable information. No consent is required under GDPR/ePrivacy Directive.
            </P>
            <P>
                <strong className="text-text/80">Server logs:</strong> Our hosting provider Vercel may
                automatically collect IP addresses and request metadata for security and operational
                purposes (legal basis: Art. 6(1)(f) GDPR — legitimate interest).
            </P>

            <H2>3. Cookies</H2>
            <P>
                This website does not use cookies for tracking or analytics. A single functional
                preference (language selection) may be stored in <code>localStorage</code> — this is
                not a cookie and is not transmitted to any server.
            </P>

            <H2>4. Third-party services</H2>
            <P>
                <strong className="text-text/80">Vercel Inc.</strong> (hosting, edge network, analytics) —
                440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel complies with the EU-US Data
                Privacy Framework.{" "}
                <ExternalLink href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy</ExternalLink>.
            </P>
            <P>
                <strong className="text-text/80">Resend Inc.</strong> (transactional email, contact form
                only) — your enquiry is transmitted via Resend to our inbox and is not stored by Resend
                beyond delivery.{" "}
                <ExternalLink href="https://resend.com/legal/privacy-policy">Resend Privacy Policy</ExternalLink>.
            </P>

            <H2>5. Your rights (GDPR Art. 15–22)</H2>
            <P>
                You have the right to access, rectify, erase, restrict, and port your personal data, and to
                object to processing. To exercise these rights, contact us at{" "}
                <MailLink email="studio@cojauny.com" />. You also have the right to lodge a complaint with
                your local supervisory authority.
            </P>

            <H2>6. Data retention</H2>
            <P>
                Contact form enquiries are retained for as long as necessary to fulfil the enquiry and for
                legal record-keeping obligations (up to 6 years under German commercial law). Analytics
                data is retained per Vercel&apos;s standard retention period (90 days for raw data).
            </P>

            <H2>7. Contact for privacy matters</H2>
            <P>
                <MailLink email="studio@cojauny.com" />
            </P>

            <P>
                <span className="text-faint text-xs">{t("last_updated", { date: "2026-01-01" })}</span>
            </P>
        </LegalLayout>
    );
}
