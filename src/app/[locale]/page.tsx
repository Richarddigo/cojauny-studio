import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EcosystemBanner from "@/components/sections/EcosystemBanner";
import SponsorsSection from "@/components/sections/SponsorsSection";
import CTASection from "@/components/sections/CTASection";
import { buildAlternates, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "hero" });
    return {
        alternates: buildAlternates(locale, "/"),
        openGraph: {
            url: `${SITE_URL}/${locale}`,
            title: "Cojauny Studio — We build software that matters.",
            description: t("subheadline"),
        },
    };
}

export default function HomePage() {
    return (
        <>
            <Hero />
            <ServicesSection variant="home" />
            <ProjectsSection variant="home" />
            <EcosystemBanner />
            <SponsorsSection />
            <CTASection />
        </>
    );
}
