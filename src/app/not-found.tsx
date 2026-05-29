/**
 * Root-level 404 page.
 *
 * Rendered by Next.js when a URL doesn't match any route and no locale-scoped
 * not-found handler catches it first. Must supply <html> and <body> because the
 * root layout intentionally omits them (the locale layout owns the lang attr).
 */
export default function RootNotFound() {
    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    background: "#0C1120",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    flexDirection: "column",
                    textAlign: "center",
                    gap: "12px",
                    padding: "0 24px",
                }}
            >
                <p
                    style={{
                        fontSize: "clamp(4rem,12vw,8rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        margin: 0,
                        background:
                            "linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    404
                </p>
                <h1
                    style={{
                        fontSize: "clamp(1.25rem,4vw,2rem)",
                        fontWeight: 700,
                        margin: 0,
                    }}
                >
                    Page not found
                </h1>
                <p style={{ color: "#9CA3AF", margin: 0, maxWidth: "24rem" }}>
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <a
                    href="/en"
                    style={{
                        marginTop: "8px",
                        padding: "10px 28px",
                        background: "#3B82F6",
                        borderRadius: "8px",
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                    }}
                >
                    Go home
                </a>
            </body>
        </html>
    );
}
