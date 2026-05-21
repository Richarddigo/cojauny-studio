export default function Loading() {
    return (
        <section className="container-studio section-padding" aria-busy="true" aria-live="polite">
            <div className="animate-pulse space-y-6">
                <div className="h-4 w-32 rounded bg-[rgba(255,255,255,0.06)]" />
                <div className="h-12 w-3/4 rounded bg-[rgba(255,255,255,0.08)]" />
                <div className="h-12 w-1/2 rounded bg-[rgba(255,255,255,0.08)]" />
                <div className="h-4 w-2/3 rounded bg-[rgba(255,255,255,0.05)]" />
                <div className="h-4 w-1/2 rounded bg-[rgba(255,255,255,0.05)]" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="h-48 rounded-2xl bg-[rgba(255,255,255,0.04)]"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
