import type { Pack } from "@/content/packs";
import { fixtureFor } from "@/lib/demo/fixtures";
import { finalizeAnalysis } from "@/lib/ai/pipeline";
import { verifyReasoning } from "./verification";
/** Compatibility wrapper; completion uses the same structured verifier as analysis. */
export const gradeTransfer = (pack: Pack, answer: string, reasoning: string) => {
 const analysis=finalizeAnalysis(pack,reasoning,fixtureFor(pack,reasoning),{fallbackUsed:true,model:"fixture-v1",promptVersion:"local",latencyMs:0});
 const verification=verifyReasoning(pack,reasoning,analysis,"transfer",answer);
 return { correct:verification.answerCorrect, methodValid:verification.success, incomplete:reasoning.trim().length<12, verification };
};
