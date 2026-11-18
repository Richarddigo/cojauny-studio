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
            <H2>{t("cookies.content.heading")}</H2>
            <P>{t("cookies.content.choice_body")}</P>
            <H2>{t("cookies.content.storage")}</H2>
            <P>{t("cookies.content.storage_body")}</P>
            <H2>{t("cookies.content.services")}</H2>
            <P>{t("cookies.content.services_body")}</P>
            <H2>{t("cookies.content.questions")}</H2>
            <P>
                <MailLink email="studio@cojauny.com" />
            </P>
            <P>
                <span className="text-faint text-xs">
                    {t("last_updated", { date: "2026-11-16" })}
                </span>
            </P>
        </LegalLayout>
    );
}
