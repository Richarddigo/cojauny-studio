import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/CookieBanner";
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

    // Required for static rendering with generateStaticParams:
    // sets the locale in the async context so getMessages() / useTranslations()
    // can read the correct locale during build-time static generation.
    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={inter.variable}
            data-scroll-behavior="smooth"
        >
            <body className="min-h-screen flex flex-col antialiased">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    Skip to main content
                </a>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <main id="main-content" className="flex-1">{children}</main>
                    <Footer />
                    <CookieBanner />
                </NextIntlClientProvider>
                <JsonLd locale={locale} />
                <Analytics />
            </body>
        </html>
    );
}
