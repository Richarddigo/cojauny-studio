"use client";

import { useMemo, Suspense, useState, useRef, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { localeValues, type Locale } from '@/locales/config';
import { SpainFlag, UKFlag, GermanyFlag, FranceFlag } from './FlagIcons';
import Icon from '../ui/Icon';

interface LanguageSwitcherProps {
    currentLocale: Locale;
    label?: string;
    dropdownDirection?: 'up' | 'down';
    onSelect?: (nextLocale: Locale) => void;
    fullWidth?: boolean;
}

const languageLabels: Record<Locale, string> = {
    es: 'Español',
    en: 'English',
    de: 'Deutsch',
    // fr: 'Français'
};

const languageFlags: Record<Locale, React.ComponentType<{ className?: string }>> = {
    es: SpainFlag,
    en: UKFlag,
    de: GermanyFlag,
    // fr: FranceFlag
};

const languageCodes: Record<Locale, string> = {
    es: 'ES',
    en: 'EN',
    de: 'DE',
    // fr: 'FR'
};

const LanguageSwitcherInner = ({ currentLocale, label, dropdownDirection = 'down', onSelect, fullWidth }: LanguageSwitcherProps) => {
    const router = useRouter();
    const pathname = usePathname() ?? '/';
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const options = useMemo(
        () =>
            localeValues.map((value: string | number) => {
                const locale = value as Locale;
                return {
                    value,
                    label: languageLabels[locale],
                    flag: languageFlags[locale],
                    code: languageCodes[locale]
                };
            }),
        []
    );

    const navigateToLocale = (nextLocale: Locale) => {
        if (nextLocale === currentLocale) {
            return;
        }

        // Preserve current hash/section and scroll position
        const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

        const segments = pathname.split('/').filter((segment, index) => !(segment === '' && index !== 0));

        if (segments.length > 1) {
            segments[1] = nextLocale;
        } else if (segments.length === 1) {
            segments.push(nextLocale);
        }

        const nextPath = `/${segments.slice(1).join('/')}` || `/${nextLocale}`;
        const query = searchParams?.toString();

        const target = query ? `${nextPath}?${query}${currentHash}` : `${nextPath}${currentHash}`;

        router.push(target);

        // Notify parent (for example to close mobile menus)
        if (typeof onSelect === 'function') {
            try {
                onSelect(nextLocale);
            } catch (e) {
                // ignore
            }
        }

        // Restore scroll position after navigation
        if (typeof window !== 'undefined') {
            // Use requestAnimationFrame to ensure DOM is updated
            requestAnimationFrame(() => {
                window.scrollTo(0, currentScrollY);
            });
        }
    };

    const activeOption = options.find((option: { value: any; }) => option.value === currentLocale);
    const buttonLabel = activeOption?.label ?? currentLocale.toUpperCase();
    const ButtonFlag = activeOption?.flag ?? (() => <span>🌐</span>);
    const buttonCode = activeOption?.code ?? currentLocale.toUpperCase();

    const buttonAriaLabel = label ?? 'Change language';
    // outside click handler
    useEffect(() => {
        const handleDocClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleDocClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleDocClick);
        };
    }, [open]);

    // When used inside the mobile menu (fullWidth), ensure the menu container becomes scrollable when the dropdown opens
    useEffect(() => {
        if (!open || !fullWidth) return;
        try {
            // find closest ancestor with role=dialog (mobile menu portal)
            const el = buttonRef.current?.closest('[role="dialog"]') as HTMLElement | null;
            if (!el) return;
            // store original overflow to restore later
            const prevOverflow = el.style.overflowY;
            const prevMax = el.style.maxHeight;
            el.style.overflowY = 'auto';
            el.style.maxHeight = '100vh';
            return () => {
                el.style.overflowY = prevOverflow;
                el.style.maxHeight = prevMax;
            };
        } catch (e) {
            // ignore
        }
    }, [open, fullWidth]);

    // keyboard handling + focus trap
    useEffect(() => {
        if (!open) return;
        const el = menuRef.current;
        if (!el) return;
        const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const focusFirst = () => {
            const focusable = Array.from(el.querySelectorAll<HTMLElement>(focusableSelector));
            // pick the first that is in the document and not inert
            const first = focusable.find((f) => document.contains(f) && !f.hasAttribute('aria-hidden'));
            first?.focus();
        };

        focusFirst();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                buttonRef.current?.focus();
                return;
            }
            if (e.key === 'Tab') {
                const focusable = Array.from(el.querySelectorAll<HTMLElement>(focusableSelector)).filter((f) => document.contains(f));
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!first || !last) return;
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }

            // Arrow navigation and Enter activation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
                const focusable = Array.from(el.querySelectorAll<HTMLElement>(focusableSelector)).filter((f) => document.contains(f));
                if (!focusable.length) return;
                const active = document.activeElement as HTMLElement | null;
                let idx = focusable.findIndex((f) => f === active);
                if (idx === -1) idx = 0;
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = focusable[(idx + 1) % focusable.length];
                    next.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = focusable[(idx - 1 + focusable.length) % focusable.length];
                    prev.focus();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (active && active instanceof HTMLElement) {
                        (active as HTMLElement).click();
                    }
                }
            }
        };

        const onFocusIn = (e: FocusEvent) => {
            const target = e.target as Node | null;
            if (target && el && !el.contains(target) && !buttonRef.current?.contains(target)) {
                // redirect focus back to menu
                focusFirst();
            }
        };

        document.addEventListener('keydown', onKey);
        document.addEventListener('focusin', onFocusIn);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('focusin', onFocusIn);
        };
    }, [open]);

    return (
        <div className={fullWidth ? 'relative w-full text-center' : 'relative inline-block text-left'} ref={menuRef}>
            <button
                ref={buttonRef}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={buttonAriaLabel}
                onClick={() => setOpen((v) => !v)}
                className={`${fullWidth ? 'mx-auto' : ''} inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white shadow-soft-glow transition hover:border-brand-200 hover:bg-white/10 focus:outline-none focus-visible:border-brand-200 focus-visible:ring-2 focus-visible:ring-brand-200/50`}
            >
                <span aria-hidden className="flex items-center">
                    <ButtonFlag className="h-5 w-5 rounded-sm" />
                </span>
                <span className="inline">{buttonLabel}</span>
                <Icon name="chevron-down" className="h-4 w-4 text-white/60" aria-hidden />
            </button>

            {open && (
                <div role="menu" aria-label="Language selector" className={`absolute z-50 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 min-w-max w-auto overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 p-2 shadow-soft-glow backdrop-blur ${dropdownDirection === 'up' ? 'bottom-full mb-2 origin-bottom-right' : 'mt-2 origin-top-right'}`}
                    onTouchStart={(e) => {
                        (e.currentTarget as any)._touchStartX = e.touches?.[0]?.clientX ?? 0;
                    }}
                    onTouchEnd={(e) => {
                        const touchEndX = e.changedTouches?.[0]?.clientX ?? 0;
                        const touchStartX = (e.currentTarget as any)._touchStartX ?? 0;
                        const delta = touchEndX - touchStartX;
                        if (delta < -50) {
                            setOpen(false);
                        }
                    }}
                >
                    {/* Ensure the dropdown itself never causes page overflow on small screens. Limit its height. */}
                    <div className="max-h-[40vh] overflow-y-auto">
                        {options.map((option: { value: Key | null | undefined; flag: any; label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => {
                            const isActive = option.value === currentLocale;
                            const FlagComponent = option.flag;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        navigateToLocale(option.value as Locale);
                                        setOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2 text-left text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-white/80'}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span aria-hidden className="flex h-8 w-8 items-center justify-center">
                                            <FlagComponent className="h-6 w-6 rounded-sm" />
                                        </span>
                                        <span className="font-medium">{option.label}</span>
                                    </span>
                                    {isActive ? <Icon name="check" className="h-4 w-4 text-brand-200" aria-hidden /> : null}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const LanguageSwitcher = (props: LanguageSwitcherProps) => {
    const FallbackFlag = languageFlags[props.currentLocale];
    return (
        <Suspense fallback={
            <div className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white">
                <span className="flex items-center">
                    <FallbackFlag className="h-5 w-5 rounded-sm" />
                </span>
                <span className="hidden sm:inline">{languageLabels[props.currentLocale]}</span>
            </div>
        }>
            <LanguageSwitcherInner {...props} />
        </Suspense>
    );
};

export default LanguageSwitcher;
