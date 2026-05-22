"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import HeroDecor from "./HeroDecor";

/**
 * Hero — server component. The H1 (LCP candidate) is rendered statically
 * on the server, free of JS animation frameworks. Background decor is
 * rendered by a lightweight client component using CSS-only animations.
 */
export default function Hero() {
    const t = useTranslations("hero");
    const stats = t.raw("stats") as { value: string; label: string }[];

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            aria-label="Hero"
        >
            {/* Deep background */}
            <div className="absolute inset-0 bg-bg" />

            {/* Animated decor (client) */}
            <HeroDecor />

            {/* Large mountain background art */}
            <div
                className="absolute right-[-4%] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
                style={{ opacity: 0.038 }}
                aria-hidden="true"
            >
                <Icon name="mountain-white" size={480} className="text-accent" />
            </div>

            {/* Top-right geometric accent */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(91,123,255,0.07) 0%, transparent 60%)",
                }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className="container-studio relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
                <div className="max-w-3xl">
                    {/* Label pill */}
                    <div className="mb-8">
                        <span
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em]"
                            style={{
                                background: "rgba(91,123,255,0.12)",
                                border: "1px solid rgba(91,123,255,0.28)",
                                color: "#93A8FF",
                            }}
                        >
                            <Icon name="mountain-white" size={24} className="text-accent" />
                            {t("label")}
                        </span>
                    </div>

                    {/* LCP H1 — static, server-rendered */}
                    <h1 className="text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-text">
                        {t("headline_1")}
                        <br />
                        <span className="gradient-text">{t("headline_2")}</span>
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="mt-5 text-base md:text-[1.125rem] leading-[1.75] max-w-xl"
                        style={{ color: "var(--muted)" }}
                    >
                        {t("subheadline")}
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Button href="/contact" size="lg">
                            {t("cta_primary")}
                            <Icon
                                name="arrow-right"
                                size={16}
                                className="ml-1.5 group-hover:translate-x-0.5 transition-transform"
                            />
                        </Button>
                        <Button href="/projects" variant="secondary" size="lg">
                            {t("cta_secondary")}
                        </Button>
                    </div>

                    {/* Ecosystem link */}
                    <div className="mt-10">
                        <a
                            href="https://cojauny.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 text-sm focus-ring rounded group"
                            style={{ color: "var(--faint)" }}
                        >
                            <span className="hero-ecosystem-line" aria-hidden="true" />
                            <span className="group-hover:text-muted transition-colors">
                                {t("ecosystem_label")}
                            </span>
                            <Icon
                                name="external-link"
                                size={12}
                                className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                            />
                        </a>
                    </div>
                </div>

                {/* Stats row */}
                <div className="mt-14 md:mt-20 pt-6 md:pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-x-10 gap-y-4">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <div className="text-2xl font-extrabold text-text tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-xs text-faint mt-0.5 tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
                <div className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center pt-1.5">
                    <div className="w-1 h-1.5 rounded-full bg-accent hero-scroll-dot" />
                </div>
            </div>
        </section>
    );
}
