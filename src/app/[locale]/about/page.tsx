import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import CTASection from "@/components/sections/CTASection";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about" });
    return {
        title: t("title"),
        description: t("description"),
        alternates: buildAlternates(locale, "/about"),
    };
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "about" });

    return (
        <>
            {/* Hero */}
            <section className="section-padding relative overflow-hidden" aria-labelledby="about-hero-heading">
                <div
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(91,123,255,0.15)_0%,transparent_65%)]"
                />
                <div className="container-studio relative z-10 pt-8 text-center">
                    <AnimateIn>
                        <span
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] mb-8 bg-[rgba(91,123,255,0.12)] border border-[rgba(91,123,255,0.25)] text-accent-light"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {t("pill")}
                        </span>
                        <h1
                            id="about-hero-heading"
                            className="text-[clamp(2.2rem,6vw,4rem)] font-extrabold tracking-[-0.03em] leading-tight"
                        >
                            <span className="text-text">{t("hero_heading_1")}</span>{" "}
                            <span
                                className="bg-[linear-gradient(135deg,var(--accent)_0%,#818cf8_100%)] bg-clip-text text-transparent"
                            >
                                {t("hero_heading_2")}
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted leading-relaxed">
                            {t("hero_subheadline")}
                        </p>
                    </AnimateIn>
                </div>
            </section>

            {/* Mission */}
            <section className="section-padding" aria-labelledby="about-mission-heading">
                <div className="container-studio">
                    <AnimateIn>
                        <div className="max-w-3xl mx-auto">
                            <p
                                className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent-light"
                            >
                                {t("mission_label")}
                            </p>
                            <h2
                                id="about-mission-heading"
                                className="text-[clamp(1.6rem,4vw,2.8rem)] font-extrabold tracking-tight text-text mb-6"
                            >
                                {t("mission_title")}
                            </h2>
                            <p className="text-muted text-lg leading-relaxed">{t("mission_body")}</p>
                        </div>
                    </AnimateIn>
                </div>
            </section>

            {/* Values */}
            <section
                className="section-padding bg-[linear-gradient(180deg,#0f172a_0%,#0C1120_100%)]"
                aria-labelledby="about-values-heading"
            >
                <div className="container-studio">
                    <AnimateIn>
                        <p
                            className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-center text-accent-light"
                        >
                            {t("values_label")}
                        </p>
                        <h2
                            id="about-values-heading"
                            className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-tight text-text mb-12 text-center"
                        >
                            {t("values_title")}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {(["craft", "honesty", "focus", "ownership"] as const).map((v) => (
                                <div
                                    key={v}
                                    className="card-dark rounded-2xl p-6 bg-[rgba(28,35,54,0.8)] border border-[rgba(255,255,255,0.07)]"
                                >
                                    <h3 className="text-text font-bold text-lg mb-3">
                                        {t(`value_${v}_title` as Parameters<typeof t>[0])}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {t(`value_${v}_desc` as Parameters<typeof t>[0])}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </AnimateIn>
                </div>
            </section>

            {/* Product Ecosystem */}
            <section className="section-padding" aria-labelledby="about-ecosystem-heading">
                <div className="container-studio">
                    <AnimateIn>
                        <p
                            className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent-light"
                        >
                            {t("ecosystem_label")}
                        </p>
                        <h2
                            id="about-ecosystem-heading"
                            className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-tight text-text mb-4"
                        >
                            {t("ecosystem_title")}
                        </h2>
                        <p className="text-muted text-lg leading-relaxed mb-10 max-w-2xl">
                            {t("ecosystem_body")}
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <a
                                href="https://cojauny.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 bg-[rgba(28,35,54,0.8)] border border-[rgba(91,123,255,0.2)]"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-text font-bold text-lg">{t("product_cojauny_name")}</h3>
                                    <span
                                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgba(251,191,36,0.12)] text-[#FCD34D] border border-[rgba(251,191,36,0.2)]"
                                    >
                                        {t("product_cojauny_status")}
                                    </span>
                                </div>
                                <p className="text-muted text-sm leading-relaxed">{t("product_cojauny_desc")}</p>
                            </a>
                            <a
                                href="https://cuatrosotas.cojauny.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 bg-[rgba(28,35,54,0.8)] border border-[rgba(91,123,255,0.2)]"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-text font-bold text-lg">{t("product_cuatrosotas_name")}</h3>
                                    <span
                                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgba(148,163,184,0.12)] text-muted border border-[rgba(148,163,184,0.2)]"
                                    >
                                        {t("product_cuatrosotas_status")}
                                    </span>
                                </div>
                                <p className="text-muted text-sm leading-relaxed">{t("product_cuatrosotas_desc")}</p>
                            </a>
                        </div>
                    </AnimateIn>
                </div>
            </section>

            {/* Approach */}
            <section
                className="section-padding bg-[linear-gradient(180deg,#0f172a_0%,#0C1120_100%)]"
                aria-labelledby="about-approach-heading"
            >
                <div className="container-studio">
                    <AnimateIn>
                        <p
                            className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent-light"
                        >
                            {t("approach_label")}
                        </p>
                        <h2
                            id="about-approach-heading"
                            className="text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold tracking-tight text-text mb-4"
                        >
                            {t("approach_title")}
                        </h2>
                        <p className="text-muted text-lg leading-relaxed mb-10 max-w-2xl">
                            {t("approach_body")}
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            {([1, 2, 3] as const).map((n) => (
                                <div
                                    key={n}
                                    className="rounded-2xl p-6 bg-[rgba(28,35,54,0.8)] border border-[rgba(255,255,255,0.07)]"
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 text-sm font-bold bg-[rgba(91,123,255,0.15)] text-accent-light"
                                    >
                                        {String(n).padStart(2, "0")}
                                    </div>
                                    <h3 className="text-text font-bold mb-2">
                                        {t(`approach_item_${n}_title` as Parameters<typeof t>[0])}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {t(`approach_item_${n}_desc` as Parameters<typeof t>[0])}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </AnimateIn>
                </div>
            </section>

            {/* Inline CTA */}
            <section className="section-padding" aria-labelledby="about-cta-heading">
                <div className="container-studio">
                    <AnimateIn>
                        <div
                            className="rounded-2xl p-10 text-center bg-[rgba(28,35,54,0.8)] border border-[rgba(91,123,255,0.2)]"
                        >
                            <h2
                                id="about-cta-heading"
                                className="text-[clamp(1.4rem,3.5vw,2.2rem)] font-extrabold tracking-tight text-text mb-4"
                            >
                                {t("cta_title")}
                            </h2>
                            <p className="text-muted text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                                {t("cta_body")}
                            </p>
                            <Button href="/contact" size="lg">
                                {t("cta_button")}
                            </Button>
                        </div>
                    </AnimateIn>
                </div>
            </section>

            <CTASection />
        </>
    );
}
