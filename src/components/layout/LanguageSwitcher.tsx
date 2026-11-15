"use client";

import { useMemo, useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import { localeValues, type Locale } from "@/locales/config";
import { SpainFlag, UKFlag, GermanyFlag, FranceFlag } from "./FlagIcons";
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
    fr: "Français",
};

const languageFlags: Record<
    Locale,
    React.ComponentType<{ className?: string }>
> = {
    es: SpainFlag,
    en: UKFlag,
    de: GermanyFlag,
    fr: FranceFlag,
};

const languageCodes: Record<Locale, string> = {
    es: "ES",
    en: "EN",
    de: "DE",
    fr: "FR",
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
        [],
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
                el.querySelectorAll<HTMLElement>("button[role='menuitem']"),
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
                focusables[
                    (idx - 1 + focusables.length) % focusables.length
                ].focus();
            }
        };
        document.addEventListener("keydown", onKey);
        const first = el.querySelector<HTMLElement>("button[role='menuitem']");
        first?.focus();
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <div
            className={
                fullWidth
                    ? "relative w-full text-center"
                    : "relative inline-block text-left"
            }
            ref={menuRef}
        >
            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`${buttonAriaLabel}: ${buttonLabel}`}
                onClick={() => setOpen((v) => !v)}
                className={`${fullWidth ? "mx-auto" : ""} language-trigger`}
            >
                <span aria-hidden className="flex items-center">
                    {FlagComp ? (
                        <FlagComp className="h-5 w-5 rounded-sm" />
                    ) : (
                        <span>🌐</span>
                    )}
                </span>
                <span className="inline">{buttonLabel}</span>
                <Icon name="chevron-down" className="h-4 w-4" aria-hidden />
            </button>

            {open && (
                <div
                    role="menu"
                    aria-label="Language selector"
                    className={`language-menu ${
                        dropdownDirection === "up"
                            ? "bottom-full mb-2 origin-bottom-right"
                            : "mt-2 origin-top-right"
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
                                    className={`language-option ${isActive ? "is-active" : ""}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span
                                            aria-hidden
                                            className="flex h-8 w-8 items-center justify-center"
                                        >
                                            <FlagComponent className="h-6 w-6 rounded-sm" />
                                        </span>
                                        <span className="font-medium">
                                            {option.label}
                                        </span>
                                    </span>
                                    <span
                                        className={`pointer-events-none absolute bottom-1 right-3 h-0.5 w-4 rounded-full bg-[var(--accent)] transition-all duration-200 ${
                                            isActive
                                                ? "scale-x-100 opacity-100"
                                                : "scale-x-50 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                                        }`}
                                        aria-hidden
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
