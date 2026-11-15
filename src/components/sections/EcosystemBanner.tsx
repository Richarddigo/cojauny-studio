import { useTranslations } from "next-intl";
export default function EcosystemBanner() {
    const t = useTranslations("ecosystem");
    return (
        <section className="ecosystem-note" aria-labelledby="ecosystem-heading">
            <div className="container-studio ecosystem-layout">
                <p className="eyebrow">{t("label")}</p>
                <div>
                    <h2 id="ecosystem-heading">{t("title")}</h2>
                    <p>{t("description")}</p>
                    <a
                        href={t("url")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                    >
                        {t("cta")}
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <span className="ecosystem-signature" aria-hidden="true">
                    C↗
                </span>
            </div>
        </section>
    );
}
