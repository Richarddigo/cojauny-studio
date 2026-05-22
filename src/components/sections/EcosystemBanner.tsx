"use client";

import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import CojaunyLogo from "@/components/ui/CojaunyLogo";
import Icon from "@/components/ui/Icon";

export default function EcosystemBanner() {
    const t = useTranslations("ecosystem");

    return (
        <section
            className="section-padding"
            style={{ background: "linear-gradient(180deg, #F1F5FF 0%, #F8FAFC 100%)" }}
            aria-label="Ecosystem"
        >
            <div className="container-studio">
                <AnimateIn>
                    <div
                        className="relative overflow-hidden rounded-3xl p-10 md:p-16"
                        style={{
                            background: "linear-gradient(135deg, #0C1120 0%, #1C2336 100%)",
                            border: "1px solid rgba(91,123,255,0.2)",
                            boxShadow: "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                    >
                        {/* Background glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 60% 80% at 90% 50%, rgba(91,123,255,0.12) 0%, transparent 60%)",
                            }}
                        />

                        {/* Background mountain */}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
                            style={{ opacity: 0.06 }}>
                            <CojaunyLogo size={200} className="text-accent" />
                        </div>

                        {/* Top border accent */}
                        <div className="absolute top-0 left-8 right-8 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(91,123,255,0.5), transparent)" }} />

                        <div className="relative z-10 max-w-2xl">
                            <span className="section-label">{t("label")}</span>
                            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-text tracking-[-0.03em] mt-2 leading-tight">
                                {t("title")}
                            </h2>
                            <p className="mt-5 text-muted leading-relaxed text-base max-w-xl">
                                {t("description")}
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-5">
                                <a
                                    href={t("url")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-bg focus-ring group hover-glow-light"
                                    style={{ background: "white" }}
                                >
                                    <Icon name="mountain-black" size={24} className="text-bg" />
                                    {t("cta")}
                                    <Icon name="external-link" size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform opacity-60 group-hover:opacity-100" />
                                </a>
                                <span className="text-sm text-faint italic">{t("tagline")}</span>
                            </div>
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}

