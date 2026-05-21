import { SITE_URL } from "@/lib/seo";

/**
 * Server component that emits Organization + WebSite JSON-LD.
 * Inject once in the locale layout.
 */
export default function JsonLd({ locale }: { locale: string }) {
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Cojauny Studio",
        url: SITE_URL,
        logo: `${SITE_URL}/icons/studio-logo.png`,
        sameAs: [
            "https://cojauny.com",
            "https://github.com/cojauny",
        ],
        contactPoint: [
            {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "studio@cojauny.com",
                availableLanguage: ["en", "es", "de"],
            },
        ],
    };

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Cojauny Studio",
        url: `${SITE_URL}/${locale}`,
        inLanguage: locale,
        publisher: { "@type": "Organization", name: "Cojauny Studio" },
    };

    return (
        <>
            <script
                type="application/ld+json"
                // JSON-LD is safe; content is fully under our control.
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
            />
        </>
    );
}
