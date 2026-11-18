import Image from "next/image";

export default function ProjectVisual({ id }: { id: string }) {
    if (id === "fcespanol") {
        return (
            <div
                className="project-art project-art-original project-art-club"
                aria-hidden="true"
            >
                <Image
                    src="/fc-espanol-logo.svg"
                    alt=""
                    width={130}
                    height={150}
                />
            </div>
        );
    }
    if (id === "cuatrosotas") {
        return (
            <div
                className="project-art project-art-original"
                aria-hidden="true"
            >
                <span className="project-art-title">Cuatro Sotas</span>
            </div>
        );
    }
    return (
        <div className="project-art project-art-original" aria-hidden="true">
            <Image src="/cojauny-white.svg" alt="" width={260} height={52} />
        </div>
    );
}
