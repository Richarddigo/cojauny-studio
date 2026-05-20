
export default function EspanolLogo({
    className = "",
    size = 24,
}: {
    className?: string;
    size?: number;
}) {
    const h = Math.round(size * 0.87);
    return (<img src="/fc-espanol-logo.svg" alt="FC Español Karlsruhe e.V." width={size} height={h} className={className} />);
}

