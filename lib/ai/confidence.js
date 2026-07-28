export const CONFIDENCE_THRESHOLD = 0.72;
export const RETRIEVAL_THRESHOLD = 0.58;
export function confidenceDecision(input, thresholds = { confidence: CONFIDENCE_THRESHOLD, retrieval: RETRIEVAL_THRESHOLD }) {
    if (input.contradiction || !input.hasEvidence)
        return "ask_follow_up";
    return input.confidence >= thresholds.confidence && input.similarity >= thresholds.retrieval && input.validatorAgrees ? "diagnose" : "no_misconception";
}
