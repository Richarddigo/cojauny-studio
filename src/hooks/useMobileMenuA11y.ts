"use client";

import { useEffect, type RefObject } from "react";

interface Options {
    open: boolean;
    menuRef: RefObject<HTMLElement | null>;
    openerRef: RefObject<HTMLButtonElement | null>;
    closerRef: RefObject<HTMLButtonElement | null>;
    portalEl: HTMLElement | null;
    onEscapeClose?: () => void;
}

const FOCUSABLE_SELECTOR = "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex=\"-1\"])";

/**
 * Encapsulates all a11y concerns for an open/close modal dialog:
 *   • body scroll lock
 *   • inert on body siblings (with aria-hidden fallback)
 *   • focus trap inside menu
 *   • Escape to close
 *   • focus restoration to opener on close
 */
export function useMobileMenuA11y(
    { open, menuRef, openerRef, closerRef, portalEl, onEscapeClose }: Options,
    setOpen: (v: boolean) => void,
) {
    // body scroll lock + inert siblings
    useEffect(() => {
        if (typeof window === "undefined") return;
        document.body.style.overflow = open ? "hidden" : "";

        const children = document.body.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child === portalEl) continue;
            if (child.tagName === "SCRIPT" || child.tagName === "STYLE" || child.tagName === "LINK") continue;
            if (!(child instanceof HTMLElement)) continue;

            (child as HTMLElement & { inert?: boolean }).inert = open;
            if (open) {
                child.setAttribute("aria-hidden", "true");
            } else {
                child.removeAttribute("aria-hidden");
            }
        }

        return () => {
            document.body.style.overflow = "";
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child === portalEl) continue;
                if (child.tagName === "SCRIPT" || child.tagName === "STYLE" || child.tagName === "LINK") continue;
                if (!(child instanceof HTMLElement)) continue;
                (child as HTMLElement & { inert?: boolean }).inert = false;
                child.removeAttribute("aria-hidden");
            }
        };
    }, [open, portalEl]);

    // focus trap + Escape
    useEffect(() => {
        if (!open) return;
        const menu = menuRef.current;
        if (!menu) return;

        const focusFirst = () => {
            const focusable = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null);
            (closerRef.current ?? focusable[0])?.focus();
        };

        focusFirst();
        const focusTimer = setTimeout(() => requestAnimationFrame(() => closerRef.current?.focus()), 120);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onEscapeClose?.();
                setOpen(false);
                return;
            }

            if (e.key === "Tab") {
                const focusable = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null);
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
        };

        const onFocusIn = (e: FocusEvent) => {
            const target = e.target as Node | null;
            if (!menu.contains(target)) {
                if (closerRef.current) closerRef.current.focus();
                else {
                    const focusable = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) => el.offsetParent !== null);
                    focusable[0]?.focus();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("focusin", onFocusIn);
        const opener = openerRef.current;

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("focusin", onFocusIn);
            try {
                opener?.focus();
            } catch {
                // ignore
            }
            clearTimeout(focusTimer);
        };
    }, [open, menuRef, openerRef, closerRef, setOpen, onEscapeClose]);

    // restore focus on close (after inert removal/paint)
    useEffect(() => {
        if (open) return;
        const t = setTimeout(
            () =>
                requestAnimationFrame(() => {
                    try {
                        openerRef.current?.focus();
                    } catch {
                        // ignore
                    }
                }),
            80,
        );
        return () => clearTimeout(t);
    }, [open, openerRef]);
}
