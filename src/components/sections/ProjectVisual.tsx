import Image from "next/image";

export default function ProjectVisual({ id }: { id: string }) {
    if (id === "fcespanol") {
        return (
            <div className="project-art project-art-club" aria-hidden="true">
                <span className="art-corner">FC / KARLSRUHE</span>
                <Image
                    src="/fc-espanol-logo.svg"
                    alt=""
                    width={130}
                    height={150}
                />
                <span className="art-caption">FC Español Karlsruhe</span>
            </div>
        );
    }
    if (id === "cuatrosotas") {
        return (
            <div className="project-art project-art-cards" aria-hidden="true">
                <span className="art-corner">CUATRO SOTAS</span>
                <div className="playing-cards">
                    {["S", "O", "C", "B"].map((suit, index) => (
                        <span
                            key={suit}
                            className={`playing-card playing-card-${index}`}
                        >
                            <span>{index + 1}</span>
                            <svg viewBox="0 0 40 56" fill="none">
                                <path
                                    d="M20 5 34 22 20 39 6 22 20 5Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M20 20v31M9 51h22"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                            <small>{suit}</small>
                        </span>
                    ))}
                </div>
                <span className="art-caption">GUIÑOTE / MULTIPLAYER</span>
            </div>
        );
    }
    return (
        <div className="project-art project-art-travel" aria-hidden="true">
            <span className="art-corner">COJAUNY / PRODUCT</span>
            <svg className="route-drawing" viewBox="0 0 480 260" fill="none">
                {[40, 100, 160, 220].map((y) => (
                    <path
                        key={y}
                        d={`M0 ${y}H480`}
                        stroke="currentColor"
                        opacity=".12"
                    />
                ))}
                {[60, 120, 180, 240, 300, 360, 420].map((x) => (
                    <path
                        key={x}
                        d={`M${x} 0V260`}
                        stroke="currentColor"
                        opacity=".12"
                    />
                ))}
                <path
                    d="M55 190H150C210 190 190 72 260 72H425"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <circle cx="55" cy="190" r="11" fill="currentColor" />
                <circle
                    cx="425"
                    cy="72"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="m236 112 12-17 19 4-12 5-4 13-4-9-11 4Z"
                    fill="currentColor"
                />
                <path
                    d="M37 164v-38h36M407 99v36h36"
                    stroke="currentColor"
                    opacity=".5"
                />
            </svg>
            <span className="travel-wordmark">
                Cojauny<span>↗</span>
            </span>
            <span className="art-caption">MOBILE / WEB</span>
        </div>
    );
}
