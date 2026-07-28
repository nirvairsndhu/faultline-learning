import { confidenceDecision } from "./confidence";
import { AnalysisSchema } from "./schemas";
import { validateEdges } from "@/lib/domain/graph-validator";
/** Applies parsing, evidence, deterministic validation, and policy to every source. */
export function finalizeAnalysis(pack, text, raw, metadata) {
    const parsed = AnalysisSchema.parse({ ...raw, ...metadata });
    const validation = validateEdges(pack, parsed.edges, text);
    const validatorAgrees = parsed.decision !== "diagnose" || validation.forbiddenFound;
    const decision = confidenceDecision({ confidence: parsed.confidence, similarity: parsed.retrievalSimilarity, contradiction: parsed.contradiction, validatorAgrees, hasEvidence: validation.valid.length > 0 || parsed.decision !== "diagnose" });
    return { ...parsed, decision: parsed.contradiction ? "ask_follow_up" : decision, misconceptionId: decision === "diagnose" ? parsed.misconceptionId : null, edges: validation.valid };
}
