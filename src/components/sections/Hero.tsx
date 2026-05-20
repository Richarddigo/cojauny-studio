"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import StudioLogo from "@/components/ui/StudioLogo";
import Icon from "@/components/ui/Icon";

const PARTICLES = [
    { w: 2, h: 2, top: "18%", left: "12%", delay: 0 },
    { w: 3, h: 3, top: "32%", left: "82%", delay: 0.4 },
    { w: 2, h: 2, top: "64%", left: "5%", delay: 0.8 },
    { w: 4, h: 4, top: "72%", left: "88%", delay: 0.2 },
    { w: 2, h: 2, top: "45%", left: "94%", delay: 1.0 },
    { w: 3, h: 3, top: "15%", left: "55%", delay: 0.6 },
    { w: 2, h: 2, top: "82%", left: "42%", delay: 1.2 },
    { w: 2, h: 2, top: "50%", left: "22%", delay: 0.3 },
];

export default function Hero() {
    const t = useTranslations("hero");

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
    };

    const item = {
        hidden: { opacity: 0, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
        },
    };

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            aria-label="Hero"
        >
            {/* ── Deep background ── */}
            <div className="absolute inset-0 bg-bg" />

            {/* ── Animated gradient orbs ── */}
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: "10%", left: "60%",
                    width: 640, height: 640,
                    background: "radial-gradient(circle, rgba(91,123,255,0.14) 0%, transparent 65%)",
                    filter: "blur(60px)",
                    borderRadius: "50%",
                }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute pointer-events-none"
                style={{
                    top: "50%", left: "15%",
                    width: 400, height: 400,
                    background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)",
                    filter: "blur(50px)",
                    borderRadius: "50%",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* ── Subtle dot grid ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
                }}
            />

            {/* ── Floating particles ── */}
            {PARTICLES.map((p, i) => (
                <motion.span
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: p.w, height: p.h,
                        top: p.top, left: p.left,
                        background: "rgba(91,123,255,0.55)",
                    }}
                    animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: p.delay,
                    }}
                />
            ))}

            {/* ── Large mountain background art ── */}
            <div
                className="absolute right-[-4%] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
                style={{ opacity: 0.038 }}
            >
                <Icon name="mountain-white" size={480} className="text-accent" />
            </div>

            {/* ── Top-right geometric accent ── */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(91,123,255,0.07) 0%, transparent 60%)",
                }}
            />

            {/* ── Content ── */}
            <div className="container-studio relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="max-w-3xl"
                >
                    {/* Label pill */}
                    <motion.div variants={item} className="mb-8">
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
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={item}
                        className="text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-text"
                    >
                        {t("headline_1")}
                        <br />
                        <span className="gradient-text">{t("headline_2")}</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={item}
                        className="mt-5 text-base md:text-[1.125rem] leading-[1.75] max-w-xl"
                        style={{ color: "var(--muted)" }}
                    >
                        {t("subheadline")}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={item}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <Button href="/contact" size="lg">
                            {t("cta_primary")}
                            <Icon name="arrow-right" size={16} className="ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                        <Button href="/projects" variant="secondary" size="lg">
                            {t("cta_secondary")}
                        </Button>
                    </motion.div>

                    {/* Ecosystem link */}
                    <motion.div variants={item} className="mt-10">
                        <a
                            href="https://cojauny.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 text-sm focus-ring rounded group"
                            style={{ color: "var(--faint)" }}
                        >
                            <motion.span
                                className="h-px bg-current rounded"
                                animate={{ width: ["20px", "28px", "20px"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                style={{ display: "inline-block" }}
                            />
                            <span className="group-hover:text-muted transition-colors">{t("ecosystem_label")}</span>
                            <Icon name="external-link" size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                    </motion.div>
                </motion.div>

                {/* ── Stats row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                    className="mt-14 md:mt-20 pt-6 md:pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-x-10 gap-y-4"
                >
                    {[
                        { value: "3+", label: "Live products" },
                        { value: "EU", label: "Based in Europe" },
                        { value: "100%", label: "Outcome-focused" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-2xl font-extrabold text-text tracking-tight">{stat.value}</div>
                            <div className="text-xs text-faint mt-0.5 tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Scroll hint ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center pt-1.5"
                >
                    <div className="w-1 h-1.5 rounded-full bg-accent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
