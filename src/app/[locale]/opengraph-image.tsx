import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cojauny Studio — Independent software engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<string, { kicker: string; title: string; tagline: string }> =
    {
        en: {
            kicker: "COJAUNY STUDIO",
            title: "Software, with intention.",
            tagline: "Apps · Web · Technical consulting",
        },
        es: {
            kicker: "COJAUNY STUDIO",
            title: "Software, con criterio.",
            tagline: "Apps · Web · Consultoría técnica",
        },
        fr: {
            kicker: "COJAUNY STUDIO",
            title: "Du logiciel, avec exigence.",
            tagline: "Apps · Web · Conseil technique",
        },
        de: {
            kicker: "COJAUNY STUDIO",
            title: "Software, mit Haltung.",
            tagline: "Apps · Web · Technische Beratung",
        },
    };

export default async function OpengraphImage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const copy = COPY[locale] ?? COPY.en;

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "80px",
                background: "#f0f1f2",
                color: "#202b33",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    color: "#98452f",
                    fontSize: 22,
                    letterSpacing: "0.18em",
                    fontWeight: 700,
                }}
            >
                <div
                    style={{
                        width: 14,
                        height: 14,
                        borderRadius: 0,
                        background: "#98452f",
                    }}
                />
                {copy.kicker}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    maxWidth: 980,
                }}
            >
                <div
                    style={{
                        fontSize: 88,
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.05,
                        color: "#202b33",
                    }}
                >
                    {copy.title}
                </div>
                <div
                    style={{
                        fontSize: 30,
                        color: "#52616a",
                        letterSpacing: "-0.01em",
                    }}
                >
                    {copy.tagline}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#52616a",
                    fontSize: 22,
                }}
            >
                <span>studio.cojauny.com</span>
                <span style={{ color: "#98452f", fontWeight: 700 }}>
                    {locale.toUpperCase()}
                </span>
            </div>
        </div>,
        { ...size },
    );
}
