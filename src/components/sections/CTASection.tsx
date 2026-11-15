import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
export default function CTASection() {
    const t = useTranslations("cta_section");
    return (
        <section className="studio-cta" aria-labelledby="cta-heading">
            <div className="container-studio">
                <div className="cta-register">
                    <p className="eyebrow">{t("pill")}</p>
                    <span aria-hidden="true">↗</span>
                </div>
                <div className="cta-layout">
                    <h2 id="cta-heading">{t("title")}</h2>
                    <div>
                        <p>{t("description")}</p>
                        <Button href="/contact">
                            {t("button")}
                            <span aria-hidden="true">↗</span>
                        </Button>
                        <small>{t("note")}</small>
                    </div>
                </div>
            </div>
        </section>
    );
}
