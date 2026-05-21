import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimateIn from "@/components/ui/AnimateIn";
import ContactForm from "@/components/contact/ContactForm";
import Icon from "@/components/ui/Icon";
import { buildAlternates } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
    return {
        title: t("title"),
        description: t("subtitle"),
        alternates: buildAlternates(locale, "/contact"),
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });

    return (
        <div className="bg-bg min-h-screen">
            <div className="pt-32 pb-24">
                <div className="container-studio">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left — info */}
                        <AnimateIn>
                            <span className="section-label">
                                <span className="w-5 h-0.5 bg-accent inline-block mr-2 rounded" />
                                {t("title")}
                            </span>
                            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-text tracking-tight mt-2 leading-tight">
                                {t("title")}
                            </h1>
                            <p className="mt-5 text-muted text-lg leading-relaxed max-w-md">
                                {t("subtitle")}
                            </p>

                            <div className="mt-10 space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-surface flex items-center justify-center border border-[var(--border)] shrink-0">
                                        <Icon name="mail" size={16} className="text-muted" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-faint uppercase tracking-wider">Email</p>
                                        <a
                                            href="mailto:studio@cojauny.com"
                                            className="text-sm font-medium text-text hover:text-accent transition-colors focus-ring rounded"
                                        >
                                            {t("email")}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-surface flex items-center justify-center border border-[var(--border)] shrink-0">
                                        <Icon name="clock" size={16} className="text-muted" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-faint uppercase tracking-wider">Response time</p>
                                        <p className="text-sm font-medium text-text">Within 48 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-surface flex items-center justify-center border border-[var(--border)] shrink-0">
                                        <Icon name="user" size={16} className="text-muted" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-faint uppercase tracking-wider">Location</p>
                                        <p className="text-sm font-medium text-text">Europe</p>
                                    </div>
                                </div>
                            </div>
                        </AnimateIn>

                        {/* Right — form */}
                        <AnimateIn delay={0.15}>
                            <div className="card-dark p-8">
                                <ContactForm />
                            </div>
                        </AnimateIn>
                    </div>
                </div>
            </div>
        </div>
    );
}
