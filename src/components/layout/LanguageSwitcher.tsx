"use client";

import { useMemo, useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import { localeValues, type Locale } from "@/locales/config";
import { SpainFlag, UKFlag, GermanyFlag } from "./FlagIcons";
import Icon from "../ui/Icon";

interface LanguageSwitcherProps {
    /** Optional override; defaults to next-intl's active locale. */
    currentLocale?: Locale;
    label?: string;
    dropdownDirection?: "up" | "down";
    onSelect?: (nextLocale: Locale) => void;
    fullWidth?: boolean;
}

const languageLabels: Record<Locale, string> = {
    es: "Español",
    en: "English",
    de: "Deutsch",
};

const languageFlags: Record<Locale, React.ComponentType<{ className?: string }>> = {
    es: SpainFlag,
    en: UKFlag,
    de: GermanyFlag,
};

const languageCodes: Record<Locale, string> = {
    es: "ES",
    en: "EN",
    de: "DE",
};

type Option = {
    value: Locale;
    label: string;
    flag: React.ComponentType<{ className?: string }>;
    code: string;
};

export default function LanguageSwitcher({
    currentLocale,
    label,
    dropdownDirection = "down",
    onSelect,
    fullWidth,
}: LanguageSwitcherProps) {
    const intlLocale = useLocale() as Locale;
    const activeLocale: Locale = currentLocale ?? intlLocale;
    const router = useRouter();
    const pathname = usePathname();
    const [, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const options = useMemo<Option[]>(
        () =>
            (localeValues as readonly Locale[]).map((value) => ({
                value,
                label: languageLabels[value],
                flag: languageFlags[value],
                code: languageCodes[value],
            })),
        []
    );

    const navigateToLocale = (nextLocale: Locale) => {
        if (nextLocale === activeLocale) return;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
        onSelect?.(nextLocale);
    };

    const activeOption = options.find((o) => o.value === activeLocale);
    const FlagComp = activeOption?.flag;
    const buttonLabel = activeOption?.label ?? activeLocale.toUpperCase();
    const buttonAriaLabel = label ?? "Change language";

    // Outside click
    useEffect(() => {
        if (!open) return;
        const handleDocClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (
                !menuRef.current.contains(e.target as Node) &&
                !buttonRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleDocClick);
        return () => document.removeEventListener("mousedown", handleDocClick);
    }, [open]);

    // Esc + ArrowDown / ArrowUp
    useEffect(() => {
        if (!open) return;
        const el = menuRef.current;
        if (!el) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
                return;
            }
            const focusables = Array.from(
                el.querySelectorAll<HTMLElement>("button[role='menuitem']")
            );
            if (!focusables.length) return;
            const active = document.activeElement as HTMLElement | null;
            let idx = focusables.findIndex((f) => f === active);
            if (idx === -1) idx = 0;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                focusables[(idx + 1) % focusables.length].focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                focusables[(idx - 1 + focusables.length) % focusables.length].focus();
            }
        };
        document.addEventListener("keydown", onKey);
        const first = el.querySelector<HTMLElement>("button[role='menuitem']");
        first?.focus();
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <div className={fullWidth ? "relative w-full text-center" : "relative inline-block text-left"} ref={menuRef}>
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={buttonAriaLabel}
                onClick={() => setOpen((v) => !v)}
                className={`${fullWidth ? "mx-auto" : ""} inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white shadow-soft-glow transition hover:border-brand-200 hover:bg-white/10 focus:outline-none focus-visible:border-brand-200 focus-visible:ring-2 focus-visible:ring-brand-200/50`}
            >
                <span aria-hidden className="flex items-center">
                    {FlagComp ? (
                        <FlagComp className="h-5 w-5 rounded-sm" />
                    ) : (
                        <span>🌐</span>
                    )}
                </span>
                <span className="inline">{buttonLabel}</span>
                <Icon name="chevron-down" className="h-4 w-4 text-white/60" aria-hidden />
            </button>

            {open && (
                <div
                    role="menu"
                    aria-label="Language selector"
                    className={`absolute z-50 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 min-w-max w-auto overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 p-2 shadow-soft-glow backdrop-blur ${dropdownDirection === "up" ? "bottom-full mb-2 origin-bottom-right" : "mt-2 origin-top-right"
                        }`}
                >
                    <div className="max-h-[40vh] overflow-y-auto">
                        {options.map((option) => {
                            const isActive = option.value === activeLocale;
                            const FlagComponent = option.flag;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        navigateToLocale(option.value);
                                        setOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2 text-left text-sm transition ${isActive ? "bg-white/10 text-white" : "text-white/80"
                                        }`}
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
}
