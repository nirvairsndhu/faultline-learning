import { notFound } from "next/navigation";
import { getPack } from "@/content/packs";
import FaultlineApp from "@/components/FaultlineApp";
export default async function Learn({ params }) { const pack = getPack((await params).packId); if (!pack)
    notFound(); return <FaultlineApp pack={pack}/>; }
