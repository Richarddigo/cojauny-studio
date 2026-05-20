"use client";
import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import Icon from "@/components/ui/Icon";
import EspanolLogo from "@/components/ui/EspanolLogo";


export default function SponsorsSection() {
    const t = useTranslations("sponsors");

    return (
        <section
            className="section-padding bg-bg"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            aria-label="Partners and Sponsors"
        >
            <div className="container-studio">
                <AnimateIn>
                    <div className="text-center mb-14">
                        <span className="section-label justify-center">{t("section_label")}</span>
                        <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold text-text tracking-[-0.03em] mt-2">
                            {t("title")}
                        </h2>
                        <p className="mt-3 text-muted max-w-xl mx-auto">{t("subtitle")}</p>
                    </div>
                </AnimateIn>

                <AnimateIn delay={0.15}>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {/* FC Español Karlsruhe */}
                        <a
                            href="https://fc-espanol.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 focus-ring"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}
                            aria-label="FC Español Karlsruhe — Official club sponsor"
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(91,123,255,0.25)";
                                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(91,123,255,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                            }}
                        >
                            {/* <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                ⚽
                            </div> */}
                            <EspanolLogo size={150} />
                            <div className="text-center">
                                <p className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
                                    FC Español Karlsruhe
                                </p>
                                <p className="text-xs text-faint mt-0.5">Official club sponsor</p>
                            </div>
                        </a>

                        {/* Placeholder */}
                        <div className="flex flex-col items-center gap-3 p-6 rounded-2xl opacity-25"
                            style={{ border: "1px dashed rgba(255,255,255,0.12)" }}>
                            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.04)" }}>
                                <Icon name="plus" size={20} className="text-faint" />
                            </div>
                            <p className="text-xs text-faint">Your brand here</p>
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
