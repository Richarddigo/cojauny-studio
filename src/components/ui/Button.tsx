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
    primary:
        "bg-accent-dim text-white hover:bg-[#2A49C9] active:scale-[0.97] shadow-[0_0_28px_rgba(91,123,255,0.35)] hover:shadow-[0_0_40px_rgba(91,123,255,0.5)] group",
    secondary:
        "bg-[rgba(255,255,255,0.06)] text-text border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]",
    ghost:
        "text-muted hover:text-text hover:bg-[rgba(255,255,255,0.05)]",
    outline:
        "border border-[var(--border-light)] text-text hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(91,123,255,0.15)]",
};

const sizeStyles: Record<Size, string> = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5",
};

function baseClasses(variant: Variant, size: Size, disabled: boolean) {
    return [
        "inline-flex items-center justify-center font-semibold rounded-[var(--radius)] transition-all duration-200 ease-out cursor-pointer focus-ring whitespace-nowrap",
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
        <button type={type} onClick={onClick} disabled={disabled || loading} className={classes}>
            {children}
        </button>
    );
}
