export const CONFIDENCE_THRESHOLD = 0.72;
export const RETRIEVAL_THRESHOLD = 0.58;
export type ConfidenceInput = { confidence:number; similarity:number; contradiction:boolean; validatorAgrees:boolean; hasEvidence:boolean };
export function confidenceDecision(input:ConfidenceInput, thresholds={confidence:CONFIDENCE_THRESHOLD,retrieval:RETRIEVAL_THRESHOLD}):"diagnose"|"ask_follow_up"|"no_misconception" {
 if(input.contradiction || !input.hasEvidence) return "ask_follow_up";
 return input.confidence >= thresholds.confidence && input.similarity >= thresholds.retrieval && input.validatorAgrees ? "diagnose" : "no_misconception";
}
