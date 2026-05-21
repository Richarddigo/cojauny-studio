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
                className="absolute pointer-events-none hero-orb hero-orb-1"
                style={{
                    top: "10%",
                    left: "60%",
                    width: 640,
                    height: 640,
                    background: "radial-gradient(circle, rgba(91,123,255,0.14) 0%, transparent 65%)",
                    filter: "blur(60px)",
                    borderRadius: "50%",
                }}
                aria-hidden="true"
            />
            <div
                className="absolute pointer-events-none hero-orb hero-orb-2"
                style={{
                    top: "50%",
                    left: "15%",
                    width: 400,
                    height: 400,
                    background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)",
                    filter: "blur(50px)",
                    borderRadius: "50%",
                }}
                aria-hidden="true"
            />

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
                }}
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
