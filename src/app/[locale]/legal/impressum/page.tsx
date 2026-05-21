import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
        title: t("impressum.title"),
        alternates: buildAlternates(locale, "/legal/impressum"),
    };
}

export default async function ImpressumPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "legal" });

    return (
        <LegalLayout
            title={t("impressum.title")}
            subtitle={t("impressum.subtitle")}
            backLabel={t("back")}
        >
            {/* ⚠️ Replace all placeholder fields before going live */}

            <H2>Angaben gemäß § 5 TMG</H2>
            <P>
                [Full legal name]<br />
                [Street and house number]<br />
                [Postal code] [City]<br />
                Germany
            </P>

            <H2>Kontakt</H2>
            <P>
                E-Mail: <MailLink email="studio@cojauny.com" />
            </P>

            <H2>Umsatzsteuer-ID</H2>
            <P>
                [Your USt-IdNr. or: Nicht vorhanden — Kleinunternehmerregelung § 19 UStG]
            </P>

            <H2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</H2>
            <P>
                [Full legal name]<br />
                [Address as above]
            </P>

            <H2>EU-Streitschlichtung</H2>
            <P>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <ExternalLink href="https://ec.europa.eu/consumers/odr/">
                    https://ec.europa.eu/consumers/odr/
                </ExternalLink>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder
                verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
            </P>

            <H2>Haftung für Inhalte</H2>
            <P>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
                den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
                jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </P>

            <P>
                <span className="text-faint text-xs">
                    {t("last_updated", { date: "2026-01-01" })}
                </span>
            </P>
        </LegalLayout>
    );
}
