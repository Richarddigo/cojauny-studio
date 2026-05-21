"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="container-studio section-padding flex flex-col items-center text-center min-h-[60vh] justify-center">
            <div className="text-6xl mb-4" aria-hidden="true">
                ⚠️
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Something went wrong
            </h1>
            <p className="mt-3 max-w-md text-muted">
                An unexpected error occurred. You can try again or reload the page.
            </p>
            {error.digest && (
                <p className="mt-2 text-xs text-faint font-mono">ref: {error.digest}</p>
            )}
            <button
                onClick={reset}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-white hover:opacity-90 transition focus-ring"
            >
                Try again
            </button>
        </section>
    );
}
