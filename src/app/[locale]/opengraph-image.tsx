import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cojauny Studio — We build software that matters.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<string, { kicker: string; title: string; tagline: string }> = {
    en: {
        kicker: "COJAUNY STUDIO",
        title: "We build software that matters.",
        tagline: "Apps · Web · Technical consulting",
    },
    es: {
        kicker: "COJAUNY STUDIO",
        title: "Construimos software que importa.",
        tagline: "Apps · Web · Consultoría técnica",
    },
    de: {
        kicker: "COJAUNY STUDIO",
        title: "Wir entwickeln Software, die zählt.",
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
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "80px",
                    background:
                        "linear-gradient(135deg, #0C1120 0%, #1C2336 60%, #111827 100%)",
                    color: "#F1F5F9",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        color: "#5B7BFF",
                        fontSize: 22,
                        letterSpacing: "0.18em",
                        fontWeight: 700,
                    }}
                >
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            background: "#5B7BFF",
                            boxShadow: "0 0 24px #5B7BFF",
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
                            color: "#F1F5F9",
                        }}
                    >
                        {copy.title}
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            color: "#94A3B8",
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
                        color: "#64748B",
                        fontSize: 22,
                    }}
                >
                    <span>studio.cojauny.com</span>
                    <span style={{ color: "#5B7BFF", fontWeight: 700 }}>
                        {locale.toUpperCase()}
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}
