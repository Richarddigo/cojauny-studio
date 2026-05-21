import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import { Link } from "@/i18n/navigation";
import Icon from "@/components/ui/Icon";

interface ProjectItem {
    id: string;
    title: string;
    category: string;
    description: string;
    status: "live" | "development" | "coming_soon";
    tags: string[];
    url: string;
}

function StatusBadge({ status, cardVariant = "dark" }: { status: ProjectItem["status"]; cardVariant?: "dark" | "light" }) {
    const t = useTranslations("projects");
    const config: Record<ProjectItem["status"], { label: string; className: string; dot: string }> = {
        live: {
            label: t("status_live"),
            className: cardVariant === "light" ? "badge-live-light" : "badge-live",
            dot: cardVariant === "light" ? "bg-[#166534]" : "bg-[#4ADE80]",
        },
        development: {
            label: t("status_development"),
            className: cardVariant === "light" ? "badge-development-light" : "badge-development",
            dot: cardVariant === "light" ? "bg-[#92400E]" : "bg-[#FCD34D]",
        },
        coming_soon: {
            label: t("status_coming_soon"),
            className: cardVariant === "light" ? "badge-coming-soon-light" : "badge-coming-soon",
            dot: cardVariant === "light" ? "bg-[#334155]" : "bg-[#94A3B8]",
        },
    };
    const { label, className, dot } = config[status];
    return (
        <span className={`badge ${className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse-glow inline-block`} />
            {label}
        </span>
    );
}

function ProjectCard({
    item,
    index,
    variant = "dark",
}: {
    item: ProjectItem;
    index: number;
    variant?: "dark" | "light";
}) {
    const t = useTranslations("projects");

    return (
        <AnimateIn delay={index * 0.1} direction="up">
            <div
                className={`${variant === "dark" ? "card-dark" : "card-light"} p-7 h-full flex flex-col gap-4 overflow-hidden`}
            >
                {/* Top colored accent line */}
                <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                    style={{
                        background: "linear-gradient(90deg, #5B7BFF 0%, rgba(91,123,255,0) 100%)",
                        opacity: item.status === "live" ? 1 : 0.4,
                    }}
                />

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.1em] mb-1.5 ${variant === "dark" ? "text-faint" : "text-[#475569]"}`}>
                            {item.category}
                        </p>
                        <h3 className={`text-xl font-bold tracking-tight ${variant === "dark" ? "text-text" : "text-[#0F172A]"}`}>
                            {item.title}
                        </h3>
                    </div>
                    <StatusBadge status={item.status} cardVariant={variant} />
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed flex-1 ${variant === "dark" ? "text-muted" : "text-[#475569]"}`}>
                    {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                        <span key={tag} className={variant === "light" ? "tech-tag-light" : "tech-tag"}>{tag}</span>
                    ))}
                </div>

                {/* Link */}
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all focus-ring rounded group mt-1 w-fit ${variant === "light" ? "text-[#2D3FC0] hover:text-[#1E3A8A]" : "text-accent hover:text-accent-dim"}`}
                >
                    {t("view_project")}
                    <Icon name="external-link" size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </AnimateIn>
    );
}

export { ProjectCard };

export default function ProjectsSection({ variant = "home" }: { variant?: "home" | "page" }) {
    const t = useTranslations("projects");
    const items = t.raw("items") as ProjectItem[];
    const sectionVariant = variant === "home" ? "dark" : "light";
    const sectionBg = variant === "home" ? "bg-surface" : "bg-light-bg";
    const headingColor = variant === "home" ? "text-text" : "text-[#0F172A]";
    const subColor = variant === "home" ? "text-muted" : "text-[#64748B]";

    return (
        <section
            className={`section-padding ${sectionBg}`}
            id="projects"
            aria-label="Projects"
        >
            <div className="container-studio">
                <AnimateIn>
                    <div className="mb-14 max-w-xl">
                        <span
                            className="section-label"
                            style={variant === "page" ? { color: "#2D3FC0" } : undefined}
                        >{t("section_label")}</span>
                        {variant === "page" ? (
                            <h1 className={`text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] mt-2 ${headingColor}`}>
                                {t("title")}
                            </h1>
                        ) : (
                            <h2 className={`text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] mt-2 ${headingColor}`}>
                                {t("title")}
                            </h2>
                        )}
                        <p
                            className={`mt-4 text-lg leading-relaxed max-w-xl ${subColor}`}
                            style={variant === "page" ? { color: "#475569" } : undefined}
                        >{t("subtitle")}</p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item, i) => (
                        <ProjectCard
                            key={item.id}
                            item={item}
                            index={i}
                            variant={sectionVariant}
                        />
                    ))}
                </div>

                {variant === "home" && (
                    <AnimateIn delay={0.35} className="mt-12">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-accent-dim transition-all focus-ring rounded group"
                        >
                            {t("cta")}
                            <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                    </AnimateIn>
                )}
            </div>
        </section>
    );
}
