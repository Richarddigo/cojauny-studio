import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalLayout, H2, P, MailLink } from "@/components/legal/LegalLayout";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "legal" });
    return { title: t("terms.title") };
}

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "legal" });

    return (
        <LegalLayout
            title={t("terms.title")}
            subtitle={t("terms.subtitle")}
            backLabel={t("back")}
        >
            <H2>1. Scope</H2>
            <P>
                These terms govern the use of this website (<em>studio.cojauny.com</em>) and any services
                enquired through it. By using this website you accept these terms.
            </P>

            <H2>2. Services</H2>
            <P>
                Cojauny Studio offers freelance software development and technical consulting services.
                The scope, timeline, and pricing of each engagement are defined in individual written
                agreements (project proposals / statements of work) between Cojauny Studio and the client.
                Nothing on this website constitutes a binding offer.
            </P>

            <H2>3. Intellectual property</H2>
            <P>
                All content on this website — including text, graphics, logos, and code — is the property
                of Cojauny Studio unless otherwise noted. You may not reproduce or redistribute any content
                without prior written consent.
            </P>
            <P>
                Work product delivered under a project agreement is governed by the IP terms specified in
                that agreement. In the absence of specific terms, full ownership transfers to the client
                upon receipt of final payment.
            </P>

            <H2>4. Confidentiality</H2>
            <P>
                Information shared during enquiries and project discussions is treated as confidential and
                not shared with third parties without consent. We may reference the engagement as a
                portfolio item with the client&apos;s prior written approval.
            </P>

            <H2>5. Limitation of liability</H2>
            <P>
                To the fullest extent permitted by law, Cojauny Studio shall not be liable for indirect,
                incidental, or consequential damages arising from the use of this website or from services
                rendered. Total liability for any claim shall not exceed the amount paid for the specific
                engagement giving rise to the claim.
            </P>

            <H2>6. Governing law</H2>
            <P>
                These terms are governed by German law. The exclusive place of jurisdiction is [City],
                Germany.
            </P>

            <H2>7. Changes</H2>
            <P>
                We reserve the right to update these terms at any time. Continued use of the website
                following changes constitutes acceptance of the updated terms.
            </P>

            <H2>8. Contact</H2>
            <P>
                <MailLink email="studio@cojauny.com" />
            </P>

            <P>
                <span className="text-faint text-xs">{t("last_updated", { date: "2026-01-01" })}</span>
            </P>
        </LegalLayout>
    );
}
