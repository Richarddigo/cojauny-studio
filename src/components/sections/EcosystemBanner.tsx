import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import CojaunyLogo from "@/components/ui/CojaunyLogo";
import Icon from "@/components/ui/Icon";

export default function EcosystemBanner() {
    const t = useTranslations("ecosystem");

    return (
        <section
            className="section-padding bg-bg"
            aria-label="Ecosystem"
        >
            <div className="container-studio">
                <AnimateIn>
                    <div
                        className="relative overflow-hidden rounded-3xl p-10 md:p-16 bg-[linear-gradient(135deg,#0C1120_0%,#1C2336_100%)] border border-[rgba(91,123,255,0.2)] shadow-[0_24px_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                        {/* Background glow */}
                        <div
                            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_90%_50%,rgba(91,123,255,0.12)_0%,transparent_60%)]"
                        />

                        {/* Background mountain */}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block opacity-[0.06]">
                            <CojaunyLogo size={200} className="text-accent" />
                        </div>

                        {/* Top border accent */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-[linear-gradient(90deg,transparent,rgba(91,123,255,0.5),transparent)]" />

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
                                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-bg bg-white focus-ring group hover-glow-light"
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

