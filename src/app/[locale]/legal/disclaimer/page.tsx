import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
        title: t("disclaimer.title"),
        alternates: buildAlternates(locale, "/legal/disclaimer"),
    };
}

export default async function DisclaimerPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "legal" });

    return (
        <LegalLayout
            title={t("disclaimer.title")}
            subtitle={t("disclaimer.subtitle")}
            backLabel={t("back")}
        >
            <H2>Liability for content</H2>
            <P>
                The contents of this website have been prepared with the utmost care. However, we cannot
                guarantee the accuracy, completeness, or timeliness of the content. As a service provider,
                we are responsible for our own content on these pages in accordance with general law (§ 7
                para.1 TMG). However, according to §§ 8 to 10 TMG, we are not obligated to monitor
                transmitted or stored third-party information or to investigate circumstances that indicate
                illegal activity.
            </P>

            <H2>Liability for links</H2>
            <P>
                Our website contains links to external websites over which we have no control. Therefore,
                we cannot accept any liability for the content of these external sites. The respective
                provider or operator of the linked pages is always responsible for their content. The linked
                pages were checked for possible legal violations at the time of linking. Illegal content was
                not recognizable at that time. Permanent monitoring of the linked pages is not reasonable
                without concrete evidence of a legal violation. If we become aware of any legal violations,
                we will remove such links immediately.
            </P>

            <H2>Copyright</H2>
            <P>
                The content and works created by the site operators on these pages are subject to German
                copyright law. The reproduction, editing, distribution, and any kind of exploitation outside
                the limits of copyright law require the written consent of the respective author or creator.
                Downloads and copies of this site are only permitted for private, non-commercial use.
            </P>

            <H2>No professional advice</H2>
            <P>
                The information on this website is provided for general informational purposes only and
                does not constitute legal, financial, or professional advice. Do not act or refrain from
                acting based on information on this site without seeking appropriate professional advice.
            </P>

            <H2>Contact</H2>
            <P>
                For any concerns regarding this disclaimer, please contact{" "}
                <MailLink email="studio@cojauny.com" />.
            </P>

            <P>
                <span className="text-faint text-xs">{t("last_updated", { date: "2026-01-01" })}</span>
            </P>
        </LegalLayout>
    );
}
