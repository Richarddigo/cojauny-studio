/* HeroDecor — pure CSS animated background. No framer-motion. */

const PARTICLES = [
    { w: 2, h: 2, top: "18%", left: "12%", delay: 0 },
    { w: 3, h: 3, top: "32%", left: "82%", delay: 0.4 },
    { w: 2, h: 2, top: "64%", left: "5%", delay: 0.8 },
    { w: 4, h: 4, top: "72%", left: "88%", delay: 0.2 },
    { w: 2, h: 2, top: "45%", left: "94%", delay: 1.0 },
    { w: 3, h: 3, top: "15%", left: "55%", delay: 0.6 },
    { w: 2, h: 2, top: "82%", left: "42%", delay: 1.2 },
    { w: 2, h: 2, top: "50%", left: "22%", delay: 0.3 },
];

export default function HeroDecor() {
    return (
        <>
            {/* Animated gradient orbs */}
            <div
                className="absolute pointer-events-none hero-orb hero-orb-1 top-[10%] left-[60%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(91,123,255,0.14)_0%,transparent_65%)] blur-[60px]"
                aria-hidden="true"
            />
            <div
                className="absolute pointer-events-none hero-orb hero-orb-2 top-[50%] left-[15%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.08)_0%,transparent_65%)] blur-[50px]"
                aria-hidden="true"
            />

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:44px_44px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_100%)]"
                aria-hidden="true"
            />

            {/* Floating particles */}
            {PARTICLES.map((p, i) => (
                <span
                    key={i}
                    className="absolute rounded-full pointer-events-none hero-particle"
                    style={{
                        width: p.w,
                        height: p.h,
                        top: p.top,
                        left: p.left,
                        background: "rgba(91,123,255,0.55)",
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${4 + i * 0.5}s`,
                    }}
                    aria-hidden="true"
                />
            ))}
        </>
    );
}
