"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import StudioLogo from "@/components/ui/StudioLogo";

export default function Footer() {
    const t = useTranslations("footer");
    const year = new Date().getFullYear();

    return (
        <footer className="bg-bg mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="container-studio py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2.5 mb-4 focus-ring rounded group"
                            aria-label="Cojauny Studio"
                        >
                            <span className="text-accent transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(91,123,255,0.7)]">
                                <StudioLogo size={150} />
                            </span>

                        </Link>
                        <p className="text-muted text-sm leading-relaxed">{t("tagline")}</p>
                        <a
                            href="https://cojauny.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-accent hover:text-accent-dim transition-colors focus-ring rounded"
                        >
                            {t("ecosystem_link")}
                        </a>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-faint mb-4">
                            {t("nav_title")}
                        </h3>
                        <ul className="space-y-2.5">
                            {(["home", "projects", "services", "contact"] as const).map((key) => {
                                const hrefs: Record<string, "/" | "/projects" | "/services" | "/contact"> = {
                                    home: "/",
                                    projects: "/projects",
                                    services: "/services",
                                    contact: "/contact",
                                };
                                return (
                                    <li key={key}>
                                        <Link
                                            href={hrefs[key]}
                                            className="text-sm text-muted hover:text-text transition-colors focus-ring rounded"
                                        >
                                            {t(key)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-faint mb-4">
                            {t("legal_title")}
                        </h3>
                        <ul className="space-y-2.5">
                            {(
                                [
                                    ["impressum", "/legal/impressum"],
                                    ["privacy", "/legal/privacy"],
                                    ["cookies", "/legal/cookies"],
                                    ["terms", "/legal/terms"],
                                    ["disclaimer", "/legal/disclaimer"],
                                ] as const
                            ).map(([key, href]) => (
                                <li key={key}>
                                    <Link
                                        href={href}
                                        className="text-sm text-muted hover:text-text transition-colors focus-ring rounded"
                                    >
                                        {t(key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-faint mb-4">
                            {t("contact_title")}
                        </h3>
                        <a
                            href="mailto:studio@cojauny.com"
                            className="text-sm text-muted hover:text-accent transition-colors focus-ring rounded"
                        >
                            studio@cojauny.com
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs text-faint">
                        {t("copyright", { year })}
                    </p>
                    <p className="text-xs text-faint">{t("made_in")}</p>
                </div>
            </div>
        </footer>
    );
}
