
export default function CojaunyLogo({
    className = "",
    size = 24,
}: {
    className?: string;
    size?: number;
}) {
    const h = Math.round(size * 0.87);
    // Static local SVG — next/image needs dangerouslyAllowSVG and offers no optimisation gain here.
    // eslint-disable-next-line @next/next/no-img-element
    return (<img src="/cojauny-white.svg" alt="Cojauny App" width={size} height={h} className={className} />);
}

