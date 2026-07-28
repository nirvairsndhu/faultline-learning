import { beforeEach, describe, expect, it, vi } from "vitest";
import { PACKS } from "@/content/packs";
import type { Analysis } from "@/lib/ai/schemas";
import { POST } from "@/app/api/analyze/route";

const { analyzeExplanation } = vi.hoisted(() => ({ analyzeExplanation: vi.fn() }));
vi.mock("@/lib/ai/featherless", () => ({ analyzeExplanation }));

const analysis: Analysis = {
  decision: "diagnose", misconceptionId: PACKS[0].id, summary: "Mass does not determine free-fall acceleration.",
  edges: [], confidence: 0.9, retrievalSimilarity: 0.8, contradiction: false, fallbackUsed: true,
  model: "fixture-v1", promptVersion: "test", latencyMs: 0,
};

describe("POST /api/analyze contract", () => {
  const call = (body: unknown) => POST(new Request("http://localhost/api/analyze", {
    method: "POST", headers: { "content-type": "application/json" }, body: typeof body === "string" ? body : JSON.stringify(body),
  }));

  beforeEach(() => { analyzeExplanation.mockReset().mockResolvedValue(analysis); });

  it.each(["not-json", JSON.stringify({ packId: PACKS[0].id })])("rejects malformed or incomplete input", async body => {
    const response = await call(body);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid analysis request" });
  });

  it("rejects invalid phases and unknown packs", async () => {
    const invalidPhase = await call({ packId: PACKS[0].id, explanation: "A valid explanation", phase: "later" });
    expect(invalidPhase.status).toBe(400);
    expect(await invalidPhase.json()).toEqual({ error: "Invalid analysis request" });
    const unknown = await call({ packId: "missing", explanation: "A valid explanation" });
    expect(unknown.status).toBe(404);
    expect(await unknown.json()).toEqual({ error: "Unknown pack" });
  });

  it("returns a stable 503 without leaking analyzer errors", async () => {
    analyzeExplanation.mockRejectedValueOnce(new Error("provider secret"));
    const response = await call({ packId: PACKS[0].id, explanation: "A valid explanation" });
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "Analysis unavailable" });
  });

  it("returns initial analysis and verified teach-back/transfer contracts", async () => {
    expect(await (await call({ packId: PACKS[0].id, explanation: "A valid explanation" })).json()).toEqual(analysis);
    const teach = await call({ packId: PACKS[0].id, explanation: "In a vacuum acceleration is independent of mass.", phase: "teach_back" });
    expect(teach.status).toBe(200); expect(await teach.json()).toMatchObject({ analysis, verification: { phase: "teach_back" } });
    const transfer = await call({ packId: PACKS[0].id, explanation: "In a vacuum acceleration is independent of mass.", phase: "transfer", selectedAnswer: PACKS[0].transfer.correctAnswer });
    expect(transfer.status).toBe(200); expect(await transfer.json()).toMatchObject({ analysis, verification: { phase: "transfer", answerCorrect: true } });
    expect(analyzeExplanation).toHaveBeenCalledTimes(3);
  });
});
