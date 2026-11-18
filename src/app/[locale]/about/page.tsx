import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
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

    const values = ["craft", "honesty", "focus", "ownership"] as const;
    return (
        <>
            <section className="about-hero" aria-labelledby="about-heading">
                <div className="container-studio">
                    <p className="eyebrow">{t("pill")}</p>
                    <h1 id="about-heading">
                        {t("hero_heading_1")}
                        <span>{t("hero_heading_2")}</span>
                    </h1>
                    <p>{t("hero_subheadline")}</p>
                </div>
            </section>
            <section className="about-statement">
                <div className="container-studio about-statement-layout">
                    <p className="eyebrow">01 / {t("mission_label")}</p>
                    <div>
                        <h2>{t("mission_title")}</h2>
                        <p className="statement-body">{t("mission_body")}</p>
                    </div>
                </div>
            </section>
            <section className="about-statement">
                <div className="container-studio about-statement-layout">
                    <p className="eyebrow">02 / {t("values_label")}</p>
                    <div className="values-list">
                        {values.map((value, index) => (
                            <article key={value}>
                                <span className="index-number">
                                    /{String(index + 1).padStart(2, "0")}
                                </span>
                                <h3>{t(`value_${value}_title`)}</h3>
                                <p>{t(`value_${value}_desc`)}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section className="about-statement">
                <div className="container-studio about-statement-layout">
                    <p className="eyebrow">03 / {t("ecosystem_label")}</p>
                    <div>
                        <h2>{t("ecosystem_title")}</h2>
                        <p className="statement-body">{t("ecosystem_body")}</p>
                        <div className="values-list mt-10">
                            <article>
                                <h3>{t("product_cojauny_name")}</h3>
                                <p>{t("product_cojauny_desc")}</p>
                                <p className="mt-3">
                                    {t("product_cojauny_status")}
                                </p>
                            </article>
                            <article>
                                <h3>{t("product_cuatrosotas_name")}</h3>
                                <p>{t("product_cuatrosotas_desc")}</p>
                                <p className="mt-3">
                                    {t("product_cuatrosotas_status")}
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-statement">
                <div className="container-studio about-statement-layout">
                    <p className="eyebrow">04 / {t("approach_label")}</p>
                    <div>
                        <h2>{t("approach_title")}</h2>
                        <p className="statement-body">{t("approach_body")}</p>
                        <ol className="process-list mt-10">
                            {[1, 2, 3].map((index) => (
                                <li key={index}>
                                    <span className="index-number">
                                        /{index}
                                    </span>
                                    <h3>{t(`approach_item_${index}_title`)}</h3>
                                    <p>{t(`approach_item_${index}_desc`)}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
            <CTASection />
        </>
    );
}
