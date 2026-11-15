"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useConsent } from "@/hooks/useConsent";

const CookieBanner = () => {
    const t = useTranslations("cookieBanner");
    const { consent, accept, reject } = useConsent();
    const hydrated = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    const open = hydrated && consent === "unknown";

    // Always render the node (position: fixed) and toggle visibility with
    // classes. Avoids the layout-shift that mounting a new body child can
    // cause post-hydration.
    return (
        <div
            className={`cookie-banner transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            hidden={!open}
            role="dialog"
            aria-live="polite"
            aria-label={t("ariaLabel")}
            aria-hidden={!open}
        >
            <p className="cookie-message">{t("message")}</p>
            <div className="cookie-actions">
                <button
                    type="button"
                    onClick={() => {
                        accept();
                    }}
                    className="cookie-accept focus-ring"
                    tabIndex={open ? 0 : -1}
                >
                    {t("acceptAll")}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        reject();
                    }}
                    className="cookie-reject focus-ring"
                    tabIndex={open ? 0 : -1}
                >
                    {t("reject")}
                </button>
                <Link
                    href="/legal/cookies"
                    className="cookie-policy focus-ring"
                    tabIndex={open ? 0 : -1}
                >
                    {t("moreInfo")}
                </Link>
            </div>
        </div>
    );
};

export default CookieBanner;
