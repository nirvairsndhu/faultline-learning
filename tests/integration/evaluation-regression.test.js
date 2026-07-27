import { describe, expect, it, vi, afterEach } from "vitest";
import cases from "@/evaluation/cases.json";
import { PACKS, getPack } from "@/content/packs";
import { analyzeExplanation } from "@/lib/ai/featherless";
import { expectedDecision } from "@/evaluation/metrics";
import { fixtureFor } from "@/lib/demo/fixtures";
describe("all authored evaluation cases", () => { for (const c of cases)
    it(c.id, async () => expect((await analyzeExplanation(getPack(c.packId), c.explanation, PACKS, { forceFixture: true })).decision).toBe(expectedDecision(c.label))); });
afterEach(() => delete process.env.FEATHERLESS_API_KEY);
it("fixture and mocked live response use identical downstream checks", async () => { const pack = PACKS[0], text = "The heavier mass makes it accelerate faster.", raw = fixtureFor(pack, text); const fixture = await analyzeExplanation(pack, text, PACKS, { forceFixture: true }); process.env.FEATHERLESS_API_KEY = "test"; const client = { chat: { completions: { create: vi.fn().mockResolvedValue({ choices: [{ message: { content: JSON.stringify(raw) } }] }) } } }; const live = await analyzeExplanation(pack, text, PACKS, { create: () => client }); expect(live.decision).toBe(fixture.decision); expect(live.edges).toEqual(fixture.edges); });
