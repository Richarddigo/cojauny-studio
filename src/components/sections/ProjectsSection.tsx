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

function StatusBadge({ status }: { status: ProjectItem["status"] }) {
    const t = useTranslations("projects");
    const config: Record<ProjectItem["status"], { label: string; className: string; dot: string }> = {
        live: {
            label: t("status_live"),
            className: "badge-live",
            dot: "bg-[#4ADE80]",
        },
        development: {
            label: t("status_development"),
            className: "badge-development",
            dot: "bg-[#FCD34D]",
        },
        coming_soon: {
            label: t("status_coming_soon"),
            className: "badge-coming-soon",
            dot: "bg-[#94A3B8]",
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
}: {
    item: ProjectItem;
    index: number;
}) {
    const t = useTranslations("projects");

    return (
        <AnimateIn delay={index * 0.1} direction="up">
            <div
                className="card-dark p-7 h-full flex flex-col gap-4 overflow-hidden"
            >
                {/* Top colored accent line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-[linear-gradient(90deg,#5B7BFF_0%,rgba(91,123,255,0)_100%)] ${item.status === "live" ? "opacity-100" : "opacity-40"}`}
                />

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-1.5 text-faint">
                            {item.category}
                        </p>
                        <h3 className="text-xl font-bold tracking-tight text-text">
                            {item.title}
                        </h3>
                    </div>
                    <StatusBadge status={item.status} />
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed flex-1 text-muted">
                    {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                </div>

                {/* Link */}
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all focus-ring rounded group mt-1 w-fit text-accent-light hover:text-[#7B9EFF]"
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

    return (
        <section
            className="section-padding bg-surface"
            id="projects"
            aria-label="Projects"
        >
            <div className="container-studio">
                <AnimateIn>
                    <div className="mb-14 max-w-xl">
                        <span
                            className="section-label text-accent-light"
                        >{t("section_label")}</span>
                        {variant === "page" ? (
                            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] mt-2 text-text">
                                {t("title")}
                            </h1>
                        ) : (
                            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] mt-2 text-text">
                                {t("title")}
                            </h2>
                        )}
                        <p className="mt-4 text-lg leading-relaxed max-w-xl text-muted">{t("subtitle")}</p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item, i) => (
                        <ProjectCard
                            key={item.id}
                            item={item}
                            index={i}
                        />
                    ))}
                </div>

                {variant === "home" && (
                    <AnimateIn delay={0.35} className="mt-12">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2.5 text-sm font-semibold text-accent-light hover:text-[#7B9EFF] transition-all focus-ring rounded group"
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
