import { Link } from "@/i18n/navigation";
import { type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: Variant;
    size?: Size;
    href?: string;
    external?: boolean;
    as?: "button" | "a";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
    primary: "studio-button-primary group",
    secondary: "studio-button-secondary",
    ghost: "studio-button-ghost",
    outline: "studio-button-outline",
};

const sizeStyles: Record<Size, string> = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
};

function baseClasses(variant: Variant, size: Size, disabled: boolean) {
    return [
        "studio-button inline-flex items-center justify-center cursor-pointer focus-ring",
        variantStyles[variant],
        sizeStyles[size],
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
    ]
        .filter(Boolean)
        .join(" ");
}

export default function Button({
    variant = "primary",
    size = "md",
    href,
    external,
    children,
    className = "",
    disabled = false,
    loading = false,
    as: Tag,
    onClick,
    type = "button",
    ...rest
}: ButtonProps) {
    const classes = `${baseClasses(variant, size, disabled || loading)} ${className}`;

    if (Tag === "button" || (!href && (onClick || type === "submit"))) {
        return (
            <button
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...(rest as any)}
                type={type}
                onClick={onClick}
                disabled={disabled || loading}
                className={classes}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {children}
                    </span>
                ) : (
                    children
                )}
            </button>
        );
    }

    if (href && external) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
                {...rest}
            >
                {children}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href as "/"} className={classes} {...(rest as object)}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={classes}
        >
            {children}
        </button>
    );
}
