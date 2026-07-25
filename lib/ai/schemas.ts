import { z } from "zod";
export const AnalysisSchema = z.object({ decision:z.enum(["diagnose","ask_follow_up","no_misconception"]), misconceptionId:z.string().nullable(), summary:z.string(), edges:z.array(z.object({source:z.string(),target:z.string(),type:z.string(),evidence:z.string()})), confidence:z.number().min(0).max(1), retrievalSimilarity:z.number().min(0).max(1), contradiction:z.boolean(), fallbackUsed:z.boolean(), model:z.string(), promptVersion:z.string(), latencyMs:z.number() });
export type Analysis = z.infer<typeof AnalysisSchema>;
