import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ConsentPreferences from "@/components/ConsentPreferences";
import StudioWordmark from "@/components/ui/StudioWordmark";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/locales/config";
export default function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale() as Locale;
    return (
        <footer className="studio-footer">
            <div className="container-studio">
                <div className="footer-layout">
                    <div className="footer-brand">
                        <Link href="/" aria-label="Cojauny Studio">
                            <StudioWordmark />
                        </Link>
                        <p>{t("tagline")}</p>
                        <a
                            href="mailto:studio@cojauny.com"
                            className="text-link"
                        >
                            studio@cojauny.com<span aria-hidden="true">↗</span>
                        </a>
                    </div>
                    <div>
                        <p className="eyebrow">{t("nav_title")}</p>
                        <nav aria-label={t("nav_title")}>
                            {(
                                [
                                    "home",
                                    "projects",
                                    "services",
                                    "about",
                                    "contact",
                                ] as const
                            ).map((key) => (
                                <Link
                                    key={key}
                                    href={key === "home" ? "/" : `/${key}`}
                                >
                                    {t(key)}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div>
                        <p className="eyebrow">{t("legal_title")}</p>
                        <nav aria-label={t("legal_title")}>
                            {(
                                [
                                    "impressum",
                                    "privacy",
                                    "cookies",
                                    "terms",
                                    "disclaimer",
                                ] as const
                            ).map((key) => (
                                <Link key={key} href={`/legal/${key}`}>
                                    {t(key)}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="footer-language">
                        <p className="eyebrow">{t("language_title")}</p>
                        <LanguageSwitcher
                            currentLocale={locale}
                            dropdownDirection="up"
                        />
                        <ConsentPreferences />
                        <div className="footer-products">
                            <a
                                href="https://cojauny.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cojauny ↗
                            </a>
                            <a
                                href="https://cuatrosotas.cojauny.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cuatro Sotas ↗
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-colophon">
                    <span>
                        {t("copyright", { year: new Date().getFullYear() })}
                    </span>
                    <span>{t("made_in")}</span>
                </div>
            </div>
        </footer>
    );
}
