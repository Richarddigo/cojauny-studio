import { Link } from "@/i18n/navigation";

export function LegalLayout({
    title,
    subtitle,
    backLabel,
    children,
}: {
    title: string;
    subtitle: string;
    backLabel: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-bg min-h-screen pt-32 pb-24">
            <div className="container-studio max-w-2xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm text-faint hover:text-muted transition-colors mb-10 focus-ring rounded"
                >
                    {backLabel}
                </Link>
                <div className="mb-10">
                    <span className="text-accent text-xs font-semibold uppercase tracking-widest">
                        Legal
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-text mt-2">{title}</h1>
                    <p className="mt-3 text-muted text-sm">{subtitle}</p>
                    <div className="mt-6 h-px bg-[var(--border)]" />
                </div>
                <div className="space-y-0">{children}</div>
            </div>
        </div>
    );
}

export function P({ children }: { children: React.ReactNode }) {
    return <p className="text-muted text-sm leading-relaxed mb-4">{children}</p>;
}

export function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-text font-semibold text-base mt-8 mb-3 pb-1.5 border-b border-[var(--border)]">
            {children}
        </h2>
    );
}

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dim transition-colors underline decoration-accent/30"
        >
            {children}
        </a>
    );
}

export function MailLink({ email }: { email: string }) {
    return (
        <a
            href={`mailto:${email}`}
            className="text-accent hover:text-accent-dim transition-colors"
        >
            {email}
        </a>
    );
}
