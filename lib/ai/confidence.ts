export const CONFIDENCE_THRESHOLD = 0.72;
export const RETRIEVAL_THRESHOLD = 0.58;
export type ConfidenceInput = { confidence:number; similarity:number; contradiction:boolean; validatorAgrees:boolean; hasEvidence:boolean };
export function confidenceDecision(input:ConfidenceInput):"diagnose"|"ask_follow_up"|"no_misconception" {
 if(input.contradiction || !input.hasEvidence) return "ask_follow_up";
 return input.confidence >= CONFIDENCE_THRESHOLD && input.similarity >= RETRIEVAL_THRESHOLD && input.validatorAgrees ? "diagnose" : "no_misconception";
}
