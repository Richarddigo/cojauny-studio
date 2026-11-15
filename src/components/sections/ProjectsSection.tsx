import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProjectVisual from "./ProjectVisual";

interface ProjectItem {
    id: string;
    title: string;
    category: string;
    description: string;
    status: "live" | "development" | "coming_soon";
    tags: string[];
    url: string;
}

export function ProjectCard({
    item,
    index,
}: {
    item: ProjectItem;
    index: number;
}) {
    const t = useTranslations("projects");
    const statusKey = {
        live: "status_live",
        development: "status_development",
        coming_soon: "status_coming_soon",
    } as const;
    return (
        <article className="project-entry" id={item.id}>
            <div className="project-entry-top">
                <span className="index-number">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`project-status status-${item.status}`}>
                    <span aria-hidden="true" />
                    {t(statusKey[item.status])}
                </span>
            </div>
            <div className="project-poster">
                <ProjectVisual id={item.id} />
            </div>
            <div className="project-details">
                <p className="project-category">{item.category}</p>
                <h3>
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.title}
                        <span aria-hidden="true">↗</span>
                    </a>
                </h3>
                <p>{item.description}</p>
                <ul className="project-tags" aria-label={item.category}>
                    {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default function ProjectsSection({
    variant = "home",
}: {
    variant?: "home" | "page";
}) {
    const t = useTranslations("projects");
    const items = t.raw("items") as ProjectItem[];
    return (
        <section
            className={`studio-section projects-section ${variant === "page" ? "page-section" : ""}`}
            id="projects"
            aria-labelledby="projects-heading"
        >
            <div className="container-studio">
                <div className="section-intro">
                    <p className="eyebrow">{t("section_label")}</p>
                    <div>
                        {variant === "page" ? (
                            <h1 id="projects-heading">{t("title")}</h1>
                        ) : (
                            <h2 id="projects-heading">{t("title")}</h2>
                        )}
                        <p>{t("subtitle")}</p>
                    </div>
                </div>
                <div className="project-index">
                    {items.map((item, index) => (
                        <ProjectCard key={item.id} item={item} index={index} />
                    ))}
                </div>
                {variant === "home" && (
                    <div className="section-end">
                        <Link href="/projects" className="text-link">
                            {t("cta")}
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
