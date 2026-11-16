import Icon from "@/components/ui/Icon";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ServicesSection({
    variant = "home",
}: {
    variant?: "home" | "page";
}) {
    const t = useTranslations("services");
    const items = t.raw("items") as {
        number: string;
        title: string;
        description: string;
    }[];
    return (
        <section
            className={`studio-section services-section ${variant === "page" ? "page-section" : ""}`}
            id="services"
            aria-labelledby="services-heading"
        >
            <div className="container-studio">
                <div className="section-intro">
                    <p className="eyebrow">{t("section_label")}</p>
                    <div>
                        {variant === "page" ? (
                            <h1 id="services-heading">{t("title")}</h1>
                        ) : (
                            <h2 id="services-heading">{t("title")}</h2>
                        )}
                        <p>{t("subtitle")}</p>
                    </div>
                </div>
                <div className="service-index">
                    {items.map((item) => (
                        <article className="service-row" key={item.number}>
                            <span className="index-number">/{item.number}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
                {variant === "home" && (
                    <div className="section-end">
                        <Link href="/services" className="text-link">
                            {t("cta")}
                            <Icon name="external-link" size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
