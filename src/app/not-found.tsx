import Link from "next/link";

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
                    background: "#f0f1f2",
                    color: "#202b33",
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
                        color: "#98452f",
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
                <p style={{ color: "#52616a", margin: 0, maxWidth: "24rem" }}>
                    The page you are looking for doesn&apos;t exist or has been
                    moved.
                </p>
                <Link
                    href="/en"
                    style={{
                        marginTop: "8px",
                        padding: "10px 28px",
                        background: "#98452f",
                        borderRadius: "2px",
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                    }}
                >
                    Go home
                </Link>
            </body>
        </html>
    );
}
