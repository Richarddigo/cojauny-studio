import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesSection from "@/components/sections/ServicesSection";
import CTASection from "@/components/sections/CTASection";
import AnimateIn from "@/components/ui/AnimateIn";
import { buildAlternates } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "services" });
    return {
        title: t("title"),
        description: t("subtitle"),
        alternates: buildAlternates(locale, "/services"),
    };
}

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "services" });
    const steps = t.raw("process.steps") as { title: string; description: string }[];

    return (
        <>
            <div className="pt-24" />
            <ServicesSection variant="page" />

            {/* Process section */}
            <section className="section-padding bg-bg border-t border-[var(--border)]">
                <div className="container-studio">
                    <AnimateIn>
                        <div className="mb-12">
                            <span className="section-label">
                                <span className="w-5 h-0.5 bg-accent inline-block mr-2 rounded" />
                                {t("process.section_label")}
                            </span>
                            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-text tracking-tight mt-2">
                                {t("process.title")}
                            </h2>
                            <p className="mt-3 text-muted text-lg max-w-xl">
                                {t("process.subtitle")}
                            </p>
                        </div>
                    </AnimateIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {steps.map((item, i) => (
                            <AnimateIn key={i} delay={i * 0.08}>
                                <div className="card-dark p-7 flex gap-5">
                                    <span className="text-[0.7rem] font-mono font-bold tracking-widest text-[#93A8FF] shrink-0 pt-1">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-base font-bold text-text mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </>
    );
}
