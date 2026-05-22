import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalLayout, H2, P, MailLink } from "@/components/legal/LegalLayout";
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
        title: t("cookies.title"),
        alternates: buildAlternates(locale, "/legal/cookies"),
    };
}

export default async function CookiesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "legal" });

    return (
        <LegalLayout
            title={t("cookies.title")}
            subtitle={t("cookies.subtitle")}
            backLabel={t("back")}
        >
            <H2>Our cookie policy</H2>
            <P>
                <strong className="text-text/80">This website does not use cookies.</strong>
            </P>
            <P>
                We have deliberately built this site without cookies — no tracking cookies, no advertising
                cookies, no analytics cookies. This means you will not see a cookie consent banner,
                because none is required.
            </P>

            <H2>What we do use</H2>
            <P>
                <strong className="text-text/80">localStorage (language preference)</strong> — When you
                select a language, your preference is stored in your browser&apos;s <code>localStorage</code>. This
                data never leaves your device and is not a cookie.
            </P>
            <P>
                <strong className="text-text/80">Vercel Analytics</strong> — Our analytics are provided
                by Vercel using a cookieless, privacy-preserving approach that derives aggregated insights
                from request data without storing personal identifiers. No consent is required.
            </P>

            <H2>Third-party scripts</H2>
            <P>
                We do not load any third-party scripts (Google Analytics, Facebook Pixel, etc.) that could
                set cookies on your device.
            </P>

            <H2>Questions?</H2>
            <P>
                Contact us at <MailLink email="studio@cojauny.com" />.
            </P>

            <P>
                <span className="text-faint text-xs">{t("last_updated", { date: "2026-01-01" })}</span>
            </P>
        </LegalLayout>
    );
}
