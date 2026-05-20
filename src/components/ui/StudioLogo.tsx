
export default function StudioLogo({
    className = "",
    size = 24,
}: {
    className?: string;
    size?: number;
}) {
    const h = Math.round(size * 0.87);
    return (<img src="/studio-cojauny-white.svg" alt="Cojauny Studio" width={size} height={h} className={className} />);
}

