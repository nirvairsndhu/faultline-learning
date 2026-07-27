import OpenAI from "openai";
import { extractionMessages, PROMPT_VERSION } from "./prompts";
import { retrieveCandidates } from "./retrieval";
import { fixtureFor } from "@/lib/demo/fixtures";
import { finalizeAnalysis } from "./pipeline";
const timeout = Number(process.env.AI_REQUEST_TIMEOUT_MS || 8000);
const maxRetries = 1;
export async function analyzeExplanation(pack, text, packs, deps = {}) {
    if (deps.forceFixture || !process.env.FEATHERLESS_API_KEY || process.env.DEMO_RELIABILITY_MODE === "true")
        return finalizeAnalysis(pack, text, fixtureFor(pack, text), { fallbackUsed: true, model: "fixture-v1", promptVersion: PROMPT_VERSION, latencyMs: 0 });
    const started = (deps.now || Date.now)();
    const client = (deps.create || (() => new OpenAI({ apiKey: process.env.FEATHERLESS_API_KEY, baseURL: process.env.FEATHERLESS_BASE_URL || "https://api.featherless.ai/v1" })))();
    const candidates = retrieveCandidates(packs, text);
    let last;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const model = attempt ? process.env.FEATHERLESS_BACKUP_MODEL || "Qwen/Qwen2.5-7B-Instruct" : process.env.FEATHERLESS_CHAT_MODEL || "Qwen/Qwen3-30B-A3B-Instruct-2507";
        try {
            const completion = await client.chat.completions.create({ model, messages: extractionMessages(pack, text, candidates.map(c => c.description)), response_format: { type: "json_object" } }, { timeout });
            const raw = JSON.parse(completion.choices[0]?.message.content || "{}");
            const parsed = finalizeAnalysis(pack, text, raw, { fallbackUsed: false, model, promptVersion: PROMPT_VERSION, latencyMs: (deps.now || Date.now)() - started });
            if (parsed.misconceptionId && !packs.some(p => p.id === parsed.misconceptionId))
                throw new Error("Unknown misconception");
            if (raw.decision === "diagnose" && parsed.decision !== "diagnose")
                throw new Error("Unsupported extraction");
            return parsed;
        }
        catch (error) {
            last = error;
        }
    }
    const fallback = finalizeAnalysis(pack, text, fixtureFor(pack, text), { fallbackUsed: true, model: "fixture-v1", promptVersion: PROMPT_VERSION, latencyMs: (deps.now || Date.now)() - started });
    return { ...fallback, summary: `Cached analysis after unavailable live inference: ${fallback.summary}` };
}
