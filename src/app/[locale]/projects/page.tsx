import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CTASection from "@/components/sections/CTASection";

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
