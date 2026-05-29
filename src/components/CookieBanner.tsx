"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useConsent } from '@/hooks/useConsent';

const CookieBanner = () => {
    const t = useTranslations('cookieBanner');
    const { consent, accept, reject } = useConsent();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(consent === 'unknown');
    }, [consent]);

    // Always render the node (position: fixed) and toggle visibility with
    // classes. Avoids the layout-shift that mounting a new body child can
    // cause post-hydration.
    return (
        <div
            className={`fixed bottom-4 left-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 rounded-2xl bg-slate-900/95 backdrop-blur-sm p-6 shadow-lg border border-white/10 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            role="dialog"
            aria-live="polite"
            aria-label={t('ariaLabel')}
            aria-hidden={!open}
        >
            <p className="mb-4 text-sm text-white/80">{t('message')}</p>
            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={() => { accept(); setOpen(false); }}
                    className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    tabIndex={open ? 0 : -1}
                >
                    {t('acceptAll')}
                </button>
                <button
                    type="button"
                    onClick={() => { reject(); setOpen(false); }}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    tabIndex={open ? 0 : -1}
                >
                    {t('reject')}
                </button>
                <Link
                    href="/legal/cookies"
                    className="ml-auto text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
                    tabIndex={open ? 0 : -1}
                >
                    {t('moreInfo')}
                </Link>
            </div>
        </div>
    );
};

export default CookieBanner;
