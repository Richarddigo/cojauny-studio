import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
export default function SponsorsSection() {
    const t = useTranslations("sponsors");
    const c = useTranslations("contact");
    const item = (
        t.raw("items") as { name: string; url: string; description: string }[]
    )[0];
    return (
        <section className="partners-note" aria-labelledby="partners-heading">
            <div className="container-studio partners-layout">
                <div>
                    <p className="eyebrow" id="partners-heading">
                        {t("section_label")}
                    </p>
                    <p>{t("subtitle")}</p>
                </div>
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-link"
                >
                    <Image
                        src="/fc-espanol-logo.svg"
                        width={48}
                        height={60}
                        alt=""
                    />
                    <span>
                        <strong>{item.name}</strong>
                        <small>{item.description}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                </a>
                <Link href="/contact" className="text-link">
                    {c("title")}
                    <span aria-hidden="true">↗</span>
                </Link>
            </div>
        </section>
    );
}
