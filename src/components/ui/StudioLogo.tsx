
export default function StudioLogo({
    className = "",
    size = 24,
}: {
    className?: string;
    size?: number;
}) {
    const h = Math.round(size * 0.87);
    // Static local SVG — next/image needs dangerouslyAllowSVG and offers no optimisation gain here.
    // eslint-disable-next-line @next/next/no-img-element
    return (<img src="/studio-cojauny-white.svg" alt="Cojauny Studio" width={size} height={h} className={className} />);
}

