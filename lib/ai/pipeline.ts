import type { Pack } from "@/content/packs";
import { confidenceDecision } from "./confidence";
import { AnalysisSchema, type Analysis } from "./schemas";
import { validateEdges } from "@/lib/domain/graph-validator";

/** Applies parsing, evidence, deterministic validation, and policy to every source. */
export function finalizeAnalysis(pack: Pack, text: string, raw: unknown, metadata: Pick<Analysis, "fallbackUsed" | "model" | "promptVersion" | "latencyMs">): Analysis {
  const parsed = AnalysisSchema.parse({ ...raw as object, ...metadata });
  const validation = validateEdges(pack, parsed.edges, text);
  const validatorAgrees = parsed.decision !== "diagnose" || validation.forbiddenFound;
  const decision = confidenceDecision({ confidence: parsed.confidence, similarity: parsed.retrievalSimilarity, contradiction: parsed.contradiction, validatorAgrees, hasEvidence: validation.valid.length > 0 || parsed.decision !== "diagnose" });
  return { ...parsed, decision: parsed.contradiction ? "ask_follow_up" : decision, misconceptionId: decision === "diagnose" ? parsed.misconceptionId : null, edges: validation.valid };
}
