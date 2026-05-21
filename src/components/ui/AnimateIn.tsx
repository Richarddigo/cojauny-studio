"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimateInProps {
    children: ReactNode;
    className?: string;
    /** Seconds to delay the reveal animation. */
    delay?: number;
    /** Kept for backwards compatibility; ignored (always uses fade-up). */
    direction?: "up" | "down" | "left" | "right" | "none";
    /** Kept for backwards compatibility; ignored. */
    duration?: number;
    /** Kept for backwards compatibility; ignored (always once). */
    once?: boolean;
}

/**
 * Reveals its children when they scroll into view.
 *
 * Implementation: CSS keyframes + IntersectionObserver.
 * Replaces the previous framer-motion implementation; zero JS animation cost.
 * Respects `prefers-reduced-motion`.
 */
export default function AnimateIn({ children, className = "", delay = 0 }: AnimateInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${seen ? "reveal-in" : "reveal-init"} ${className}`}
            style={seen && delay > 0 ? { animationDelay: `${delay}s` } : undefined}
        >
            {children}
        </div>
    );
}
