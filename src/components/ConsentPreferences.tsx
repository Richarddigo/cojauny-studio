"use client";
import { useTranslations } from "next-intl";
import { useConsent } from "@/hooks/useConsent";
export default function ConsentPreferences() {
    const t = useTranslations("cookieBanner");
    const { reset } = useConsent();
    return (
        <button
            type="button"
            className="consent-preferences text-link"
            onClick={reset}
        >
            {t("manage")}
        </button>
    );
}
