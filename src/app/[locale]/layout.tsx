import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
    themeColor: "#0C1120",
    width: "device-width",
    initialScale: 1,
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "hero" });

    return {
        title: {
            default: "Cojauny Studio — We build software that matters.",
            template: "%s | Cojauny Studio",
        },
        description: t("subheadline"),
        metadataBase: new URL(SITE_URL),
        openGraph: {
            type: "website",
            siteName: "Cojauny Studio",
            title: "Cojauny Studio — We build software that matters.",
            description: t("subheadline"),
            locale,
        },
        twitter: {
            card: "summary_large_image",
            title: "Cojauny Studio",
            description: t("subheadline"),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
            },
        },
        icons: {
            icon: "/favicon.ico",
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={inter.variable}
            data-scroll-behavior="smooth"
        >
            <body className="min-h-screen flex flex-col antialiased">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
                <JsonLd locale={locale} />
                <Analytics />
            </body>
        </html>
    );
}
