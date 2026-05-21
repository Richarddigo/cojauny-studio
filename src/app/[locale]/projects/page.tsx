import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CTASection from "@/components/sections/CTASection";
import { buildAlternates } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "projects" });
    return {
        title: t("title"),
        description: t("subtitle"),
        alternates: buildAlternates(locale, "/projects"),
    };
}

export default function ProjectsPage() {
    return (
        <>
            <div className="pt-24" />
            <ProjectsSection variant="page" />
            <CTASection />
        </>
    );
}
