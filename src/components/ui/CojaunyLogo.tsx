
export default function CojaunyLogo({
    className = "",
    size = 24,
}: {
    className?: string;
    size?: number;
}) {
    const h = Math.round(size * 0.87);
    return (<img src="/cojauny-white.svg" alt="Cojauny App" width={size} height={h} className={className} />);
}

