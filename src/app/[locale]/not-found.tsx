import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Button from "@/components/ui/Button";

export default function NotFound() {
    const t = useTranslations("not_found");

    return (
        <section className="container-studio section-padding flex flex-col items-center text-center min-h-[60vh] justify-center">
            <div className="text-[clamp(5rem,12vw,9rem)] font-extrabold leading-none gradient-text">
                404
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
                {t("title")}
            </h1>
            <p className="mt-3 max-w-md text-muted">{t("description")}</p>
            <div className="mt-8">
                <Button href="/" size="lg">
                    {t("cta")}
                </Button>
            </div>
            <Link href="/" className="sr-only">
                {t("cta")}
            </Link>
        </section>
    );
}
