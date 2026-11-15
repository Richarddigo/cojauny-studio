import { useTranslations } from "next-intl";
export default function ProcessSection() {
    const t = useTranslations("services");
    const steps = t.raw("process.steps") as {
        title: string;
        description: string;
    }[];
    return (
        <section
            className="studio-section process-section"
            aria-labelledby="process-heading"
        >
            <div className="container-studio">
                <div className="section-intro">
                    <p className="eyebrow">{t("process.section_label")}</p>
                    <div>
                        <h2 id="process-heading">{t("process.title")}</h2>
                        <p>{t("process.subtitle")}</p>
                    </div>
                </div>
                <ol className="process-list">
                    {steps.map((step, index) => (
                        <li key={step.title}>
                            <span className="index-number">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
