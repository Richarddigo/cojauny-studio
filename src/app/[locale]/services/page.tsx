import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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

    const process = [
        {
            step: "01",
            title: locale === "de" ? "Entdeckung" : locale === "es" ? "Descubrimiento" : "Discovery",
            description:
                locale === "de"
                    ? "Wir verstehen Ihre Ziele, Einschränkungen und Benutzer. Keine Annahmen."
                    : locale === "es"
                        ? "Entendemos tus objetivos, restricciones y usuarios. Sin suposiciones."
                        : "We understand your goals, constraints, and users. No assumptions.",
        },
        {
            step: "02",
            title: locale === "de" ? "Architektur" : locale === "es" ? "Arquitectura" : "Architecture",
            description:
                locale === "de"
                    ? "Wir entwerfen das richtige System für Ihren Anwendungsfall — nicht für den nächsten."
                    : locale === "es"
                        ? "Diseñamos el sistema correcto para tu caso de uso — no para el siguiente."
                        : "We design the right system for your use case — not for the next one.",
        },
        {
            step: "03",
            title: locale === "de" ? "Entwicklung" : locale === "es" ? "Desarrollo" : "Development",
            description:
                locale === "de"
                    ? "Sauberer, typisierter, getesteter Code. Regelmäßige Lieferungen. Volle Transparenz."
                    : locale === "es"
                        ? "Código limpio, tipado y probado. Entregas regulares. Transparencia total."
                        : "Clean, typed, tested code. Regular deliveries. Full transparency.",
        },
        {
            step: "04",
            title: locale === "de" ? "Lieferung & Support" : locale === "es" ? "Entrega y soporte" : "Delivery & Support",
            description:
                locale === "de"
                    ? "Deployment, Dokumentation und Übergabe. Wir sind auch danach noch da."
                    : locale === "es"
                        ? "Despliegue, documentación y transferencia. Seguimos disponibles después."
                        : "Deployment, documentation, and handover. We stay available after.",
        },
    ];

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
                                {locale === "de" ? "Unser Prozess" : locale === "es" ? "Nuestro proceso" : "How we work"}
                            </span>
                            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-text tracking-tight mt-2">
                                {locale === "de" ? "Unser Prozess" : locale === "es" ? "Nuestro proceso" : "Our process"}
                            </h2>
                            <p className="mt-3 text-muted text-lg max-w-xl">
                                {locale === "de"
                                    ? "Strukturiert, transparent und auf Lieferung ausgerichtet."
                                    : locale === "es"
                                        ? "Estructurado, transparente y orientado a la entrega."
                                        : "Structured, transparent, and delivery-focused."}
                            </p>
                        </div>
                    </AnimateIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {process.map((item, i) => (
                            <AnimateIn key={item.step} delay={i * 0.08}>
                                <div className="card-dark p-7 flex gap-5">
                                    <span className="text-[0.7rem] font-mono font-bold tracking-widest text-accent shrink-0 pt-1">
                                        {item.step}
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
