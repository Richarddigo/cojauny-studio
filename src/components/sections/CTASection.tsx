import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function CTASection() {
    const t = useTranslations("cta_section");

    return (
        <section
            className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#111827_0%,#0C1120_100%)]"
            aria-label="Call to action"
        >
            {/* Background glow blobs */}
            <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_50%_110%,rgba(91,123,255,0.18)_0%,transparent_65%)]"
            />
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none bg-[linear-gradient(180deg,rgba(91,123,255,0.5)_0%,transparent_100%)]"
            />

            <div className="container-studio relative z-10">
                <AnimateIn>
                    <div className="text-center max-w-2xl mx-auto">
                        {/* Pill label */}
                        <span
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] mb-8 bg-[rgba(91,123,255,0.12)] border border-[rgba(91,123,255,0.25)] text-accent-light"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
                            {t("pill")}
                        </span>

                        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-text tracking-[-0.03em] leading-tight">
                            {t("title")}
                        </h2>
                        <p className="mt-5 text-muted text-lg leading-relaxed">{t("description")}</p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button href="/contact" size="lg">
                                {t("button")}
                                <Icon name="arrow-right" size={16} className="ml-1.5" />
                            </Button>
                        </div>
                        <p className="mt-4 text-xs text-faint">{t("note")}</p>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
