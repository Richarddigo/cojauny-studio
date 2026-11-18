import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProcessSection from "@/components/sections/ProcessSection";
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
            title: t("meta_title"),
            description: t("subheadline"),
        },
    };
}

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <>
            <Hero />
            <ProjectsSection variant="home" />
            <ServicesSection variant="home" />
            <ProcessSection />
            <EcosystemBanner />
            <SponsorsSection />
            <CTASection />
        </>
    );
}
