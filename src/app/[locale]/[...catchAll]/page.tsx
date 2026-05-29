import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const dynamicParams = true;

export default function CatchAllPage() {
    notFound();
}
