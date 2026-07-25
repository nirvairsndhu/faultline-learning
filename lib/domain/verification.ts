import type { Pack } from "@/content/packs";
import type { Analysis } from "@/lib/ai/schemas";
import { validateEdges } from "./graph-validator";

export type VerificationPhase = "initial" | "teach_back" | "transfer";
export type Verification = ReturnType<typeof verifyReasoning>;

/** The single completion policy used after every bounded extraction. */
export function verifyReasoning(pack: Pack, text: string, analysis: Analysis, phase: VerificationPhase, selectedAnswer?: string) {
  const requirements = phase === "transfer" ? pack.transfer.required ?? pack.required : pack.required;
  const forbidden = phase === "transfer" ? pack.transfer.forbidden ?? pack.forbidden : pack.forbidden;
  const validation = validateEdges(pack, analysis.edges, text, requirements, forbidden);
  const answerCorrect = phase !== "transfer" || selectedAnswer === pack.transfer.correctAnswer;
  const exactEvidence = validation.invalidCount === 0 && validation.valid.length > 0;
  const success = answerCorrect && validation.requiredMet && !validation.forbiddenFound && !analysis.contradiction && exactEvidence;
  return { phase, success, answerCorrect, exactEvidence, contradiction: analysis.contradiction, ...validation };
}
