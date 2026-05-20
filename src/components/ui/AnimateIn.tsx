"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimateInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export default function AnimateIn({
    children,
    className,
    delay = 0,
    duration = 0.6,
    once = true,
    direction = "up",
}: AnimateInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, amount: 0.05 });

    const directionMap = {
        up: { y: 28, x: 0 },
        down: { y: -28, x: 0 },
        left: { y: 0, x: 28 },
        right: { y: 0, x: -28 },
        none: { y: 0, x: 0 },
    };

    const { x, y } = directionMap[direction];

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y, x }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
