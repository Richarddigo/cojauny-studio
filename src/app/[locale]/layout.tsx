import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "hero" });

    const baseUrl = "https://studio.cojauny.com";
    const localeUrls: Record<string, string> = {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        de: `${baseUrl}/de`,
    };

    return {
        title: {
            default: "Cojauny Studio — We build software that matters.",
            template: "%s | Cojauny Studio",
        },
        description: t("subheadline"),
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: localeUrls[locale] ?? `${baseUrl}/en`,
            languages: {
                en: `${baseUrl}/en`,
                es: `${baseUrl}/es`,
                de: `${baseUrl}/de`,
                "x-default": `${baseUrl}/en`,
            },
        },
        openGraph: {
            type: "website",
            siteName: "Cojauny Studio",
            title: "Cojauny Studio — We build software that matters.",
            description: t("subheadline"),
            url: localeUrls[locale] ?? baseUrl,
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "Cojauny Studio",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Cojauny Studio",
            description: t("subheadline"),
            images: ["/og-image.png"],
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
            className={`${inter.variable} ${jetbrainsMono.variable}`}
        >
            <body className="min-h-screen flex flex-col antialiased">
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    );
}
