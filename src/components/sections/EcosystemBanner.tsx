import Icon from "@/components/ui/Icon";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
                        <Icon name="external-link" size={16} />
                    </a>
                </div>
                <span className="ecosystem-signature" aria-hidden="true">
                    <Image
                        src="/cojauny-white.svg"
                        width={150}
                        height={30}
                        alt=""
                    />
                </span>
            </div>
        </section>
    );
}
