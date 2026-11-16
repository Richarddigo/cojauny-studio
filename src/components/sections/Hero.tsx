import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";

export default function Hero() {
    const t = useTranslations("hero");
    return (
        <section className="studio-hero" aria-labelledby="hero-heading">
            <div className="container-studio">
                <div className="hero-register">
                    <span>{t("studio_note")}</span>
                    <span>Cojauny Studio</span>
                </div>
                <div className="hero-copy">
                    <p className="eyebrow">{t("label")}</p>
                    <h1 id="hero-heading">
                        {t("headline_1")} <span>{t("headline_2")}</span>
                    </h1>
                    <div className="hero-bottom">
                        <p className="hero-description">{t("subheadline")}</p>
                        <div className="hero-actions">
                            <Button href="/contact">
                                {t("cta_primary")}
                                <Icon name="arrow-right" size={17} />
                            </Button>
                            <Link className="text-link" href="/projects">
                                {t("cta_secondary")}
                                <Icon name="external-link" size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hero-footnote">
                    <span>{t("index_label")}</span>
                    <a
                        href="https://cojauny.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("ecosystem_label")}
                        <Icon name="external-link" size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
