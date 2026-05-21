"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Button from "@/components/ui/Button";
import StudioLogo from "@/components/ui/StudioLogo";
import Icon from "@/components/ui/Icon";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/locales/config";

// ── Logo ─────────────────────────────────────────────────────────────────
// To use your real PNG: save it to public/logo.png
// then replace the body of BrandLogo with:
//   <Image src="/logo.png" alt="Cojauny Studio" width={140} height={32} className="h-8 w-auto" />
function BrandLogo() {
    return (
        <span className="flex items-center gap-2.5 leading-none">
            <span className="text-accent shrink-0 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(91,123,255,0.7)]">
                <StudioLogo size={150} />
            </span>
        </span>
    );
}

const navLinks = [
    { key: "home" as const, href: "/" as const },
    { key: "projects" as const, href: "/projects" as const },
    { key: "services" as const, href: "/services" as const },
    { key: "contact" as const, href: "/contact" as const },
];

export default function Header() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler, { passive: true });
        handler();
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const handleNavClick = () => setMobileOpen(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
                ? "bg-[rgba(12,17,32,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] shadow-[0_2px_32px_rgba(0,0,0,0.5)]"
                : "bg-transparent"
                }`}
        >
            <div className="container-studio">
                <div className="flex items-center justify-between h-18" style={{ height: "70px" }}>
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group focus-ring rounded-lg"
                        aria-label="Cojauny Studio — Home"
                    >
                        <BrandLogo />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
                        {navLinks.map(({ key, href }) => {
                            const isActive =
                                href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(href);
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-ring ${isActive
                                        ? "text-text"
                                        : "text-muted hover:text-text hover:bg-[rgba(255,255,255,0.06)]"
                                        }`}
                                >
                                    {t(key)}
                                    {isActive && (
                                        <span
                                            className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                                            style={{ background: "var(--accent)" }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher currentLocale={locale as Locale} />
                        <Button href="/contact" size="sm" className="hidden md:inline-flex">
                            {t("cta")}
                        </Button>
                        {/* Mobile nav landmark — always in accessibility tree on mobile */}
                        <nav className="md:hidden" aria-label="Main navigation">
                            <button
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-expanded={mobileOpen}
                                aria-controls="mobile-menu"
                                aria-label="Toggle menu"
                                className="p-2 rounded-lg text-muted hover:text-text hover:bg-[rgba(255,255,255,0.06)] transition-all focus-ring"
                            >
                                {mobileOpen
                                    ? <Icon name="close" size={20} />
                                    : <Icon name="hamburger" size={20} />
                                }
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile menu (CSS grid-rows collapse, no framer-motion) */}
            <div
                id="mobile-menu"
                className={`md:hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${mobileOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                aria-hidden={!mobileOpen}
            >
                <div className="min-h-0 overflow-hidden bg-[rgba(12,17,32,0.98)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]">
                    <div className="container-studio py-4 flex flex-col gap-1">
                        {navLinks.map(({ key, href }) => {
                            const isActive =
                                href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(href);
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    onClick={handleNavClick}
                                    className={`px-4 py-3.5 text-sm font-medium rounded-lg transition-all ${isActive
                                        ? "text-text bg-[rgba(91,123,255,0.12)] border border-[rgba(91,123,255,0.2)]"
                                        : "text-muted hover:text-text hover:bg-[rgba(255,255,255,0.05)]"
                                        }`}
                                    tabIndex={mobileOpen ? 0 : -1}
                                >
                                    {t(key)}
                                </Link>
                            );
                        })}
                        <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                            <Button href="/contact" size="sm" className="w-full justify-center" tabIndex={mobileOpen ? 0 : -1}>
                                {t("cta")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

