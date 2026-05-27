import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import Icon from "@/components/ui/Icon";
import EspanolLogo from "@/components/ui/EspanolLogo";
import { Link } from "@/i18n/navigation";


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
                            className="group flex flex-col items-center gap-3 p-6 rounded-2xl focus-ring hover-lift hover-lift-sponsor"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                            }}
                            aria-label={`FC Español Karlsruhe — ${(t.raw("items") as { description: string }[])[0].description}`}
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
                                <p className="text-xs text-faint mt-0.5">{(t.raw("items") as { description: string }[])[0].description}</p>
                            </div>
                        </a>

                        {/* Placeholder — links to contact */}
                        <Link href="/contact"
                            className="flex flex-col items-center gap-3 p-6 rounded-2xl opacity-25 hover:opacity-50 transition-opacity"
                            aria-label="Become a sponsor"
                            style={{ border: "1px dashed rgba(255,255,255,0.12)" }}>
                            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.04)" }}>
                                <Icon name="plus" size={20} className="text-faint" />
                            </div>
                        </Link>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
