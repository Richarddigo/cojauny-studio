import Icon from "@/components/ui/Icon";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";
import { buildAlternates } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
    return {
        title: t("meta_title"),
        description: t("subtitle"),
        alternates: buildAlternates(locale, "/contact"),
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "contact" });

    return (
        <section className="contact-page" aria-labelledby="contact-heading">
            <div className="container-studio contact-layout">
                <div className="contact-copy">
                    <p className="eyebrow">Cojauny Studio / {t("title")}</p>
                    <h1 id="contact-heading">{t("title")}</h1>
                    <p>{t("subtitle")}</p>
                    <dl className="contact-info">
                        <div>
                            <dt>Email</dt>
                            <dd>
                                <a
                                    href="mailto:studio@cojauny.com"
                                    className="text-link"
                                >
                                    {t("email")}
                                    <Icon name="external-link" size={16} />
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt>{t("response_time_label")}</dt>
                            <dd>{t("response_time_value")}</dd>
                        </div>
                        <div>
                            <dt>{t("location_label")}</dt>
                            <dd>{t("location_value")}</dd>
                        </div>
                    </dl>
                </div>
                <div className="contact-form-sheet">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
