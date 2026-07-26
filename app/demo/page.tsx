import FaultlineApp from "@/components/FaultlineApp";
import { getPack } from "@/content/packs";
export default function Demo(){return <FaultlineApp pack={getPack("vacuum-drop")!} demo/>}
