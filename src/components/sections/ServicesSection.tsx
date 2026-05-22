"use client";

import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";

interface ServiceItem {
    number: string;
    title: string;
    description: string;
}

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
    return (
        <AnimateIn delay={index * 0.1} direction="up">
            <div
                className="relative group h-full p-8 rounded-2xl border bg-white cursor-default hover-lift hover-lift-service"
                style={{
                    borderColor: "#E2E8F0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
            >
                {/* Number */}
                <div className="flex items-center justify-between mb-6">
                    <span
                        className="text-[0.65rem] font-mono font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                        style={{
                            background: "rgba(91,123,255,0.1)",
                            color: "#1E3A8A",
                            border: "1px solid rgba(91,123,255,0.18)",
                        }}
                    >
                        {item.number}
                    </span>
                    {/* Hover arrow */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Icon name="external-link" size={18} className="text-[#5B7BFF]" />
                    </span>
                </div>

                {/* Divider */}
                <div
                    className="h-px mb-6 transition-all duration-300"
                    style={{ background: "linear-gradient(90deg, #5B7BFF 0%, transparent 100%)", width: "32px" }}
                />

                <h3 className="text-[1.05rem] font-bold tracking-tight mb-3 transition-colors duration-200"
                    style={{ color: "#0F172A" }}>
                    {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{item.description}</p>
            </div>
        </AnimateIn>
    );
}

export default function ServicesSection({ variant = "home" }: { variant?: "home" | "page" }) {
    const t = useTranslations("services");
    const items = t.raw("items") as ServiceItem[];

    return (
        <section
            className="section-padding"
            style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5FF 100%)" }}
            id="services"
            aria-label="Services"
        >
            <div className="container-studio">
                <AnimateIn>
                    <div className="mb-14 max-w-xl">
                        <span className="section-label">
                            {t("section_label")}
                        </span>
                        {variant === "page" ? (
                            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight"
                                style={{ color: "#0F172A", letterSpacing: "-0.03em" }}>
                                {t("title")}
                            </h1>
                        ) : (
                            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight"
                                style={{ color: "#0F172A", letterSpacing: "-0.03em" }}>
                                {t("title")}
                            </h2>
                        )}
                        <p className="mt-4 text-lg leading-relaxed" style={{ color: "#64748B" }}>{t("subtitle")}</p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {items.map((item, i) => (
                        <ServiceCard key={item.number} item={item} index={i} />
                    ))}
                </div>

                {variant === "home" && (
                    <AnimateIn delay={0.25} className="mt-12">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2.5 text-sm font-semibold transition-colors focus-ring rounded group"
                            style={{ color: "#4F6EF7" }}
                        >
                            {t("cta")}
                            <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </AnimateIn>
                )}
            </div>
        </section>
    );
}
