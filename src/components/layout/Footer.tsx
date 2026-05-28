import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import StudioLogo from "@/components/ui/StudioLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/locales/config";

export default function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();
    const year = new Date().getFullYear();
    const currentLocale = locale as Locale;

    const ecosystemSectionLabel: Record<Locale, string> = {
        es: "Ecosistema",
        en: "Ecosystem",
        de: "Ökosystem",
        fr: "Écosystème",
    };

    const ecosystemDescription: Record<Locale, string> = {
        es: "Cojauny Studio forma parte de un ecosistema de productos digitales en evolución.",
        en: "Cojauny Studio is part of an evolving ecosystem of digital products.",
        de: "Cojauny Studio ist Teil eines sich entwickelnden Ökosystems digitaler Produkte.",
        fr: "Cojauny Studio fait partie d’un écosystème évolutif de produits numériques.",
    };

    return (
        <footer className="mt-auto border-t border-[rgba(255,255,255,0.06)] bg-bg">
            <div className="mx-auto max-w-[1180px] px-[100px] py-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2" aria-label="Cojauny Studio">
                            <span className="text-accent">
                                <StudioLogo size={132} />
                            </span>
                        </Link>
                        <p className="max-w-[18ch] text-sm leading-relaxed text-muted">{t("tagline")}</p>
                    </div>

                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">{ecosystemSectionLabel[currentLocale]}</p>
                        <div className="mb-3 flex flex-col gap-2">
                            <a
                                href="https://cojauny.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-text transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(91,123,255,0.25)]"
                                style={{ background: 'rgba(28,35,54,0.9)', border: '1px solid rgba(91,123,255,0.22)' }}
                            >
                                <span>Cojauny</span>
                                <svg className="h-3 w-3 opacity-50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a
                                href="https://cuatrosotas.cojauny.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-text transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(91,123,255,0.25)]"
                                style={{ background: 'rgba(28,35,54,0.9)', border: '1px solid rgba(91,123,255,0.22)' }}
                            >
                                <span>Cuatro Sotas</span>
                                <svg className="h-3 w-3 opacity-50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-sm leading-relaxed text-muted">{ecosystemDescription[currentLocale]}</p>
                    </div>

                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">{t("nav_title")}</p>
                        <nav className="flex flex-col gap-2">
                            <Link href="/" className="text-sm text-muted transition-colors hover:text-text">{t("home")}</Link>
                            <Link href="/projects" className="text-sm text-muted transition-colors hover:text-text">{t("projects")}</Link>
                            <Link href="/services" className="text-sm text-muted transition-colors hover:text-text">{t("services")}</Link>
                            <Link href="/about" className="text-sm text-muted transition-colors hover:text-text">{t("about")}</Link>
                            <Link href="/contact" className="text-sm text-muted transition-colors hover:text-text">{t("contact")}</Link>
                        </nav>
                    </div>

                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">{t("legal_title")}</p>
                        <nav className="flex flex-col gap-2">
                            <Link href="/legal/impressum" className="text-sm text-muted transition-colors hover:text-text">{t("impressum")}</Link>
                            <Link href="/legal/privacy" className="text-sm text-muted transition-colors hover:text-text">{t("privacy")}</Link>
                            <Link href="/legal/cookies" className="text-sm text-muted transition-colors hover:text-text">{t("cookies")}</Link>
                            <Link href="/legal/terms" className="text-sm text-muted transition-colors hover:text-text">{t("terms")}</Link>
                            <Link href="/legal/disclaimer" className="text-sm text-muted transition-colors hover:text-text">{t("disclaimer")}</Link>
                        </nav>
                    </div>

                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">{t("language_title")}</p>
                        <LanguageSwitcher currentLocale={currentLocale} dropdownDirection="up" />
                    </div>
                </div>

                <div
                    className="flex flex-col items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.06)] sm:flex-row"
                    style={{ marginTop: "3rem", paddingTop: "2rem" }}
                >
                    <p className="text-xs text-muted">{t("copyright", { year })}</p>
                    <p className="text-xs text-muted">{t("made_in")}</p>
                </div>
            </div>
        </footer>
    );
}
