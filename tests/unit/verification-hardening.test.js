import { describe, expect, it } from "vitest";
import { PACKS } from "@/content/packs";
import { fixtureFor } from "@/lib/demo/fixtures";
import { finalizeAnalysis } from "@/lib/ai/pipeline";
import { verifyReasoning } from "@/lib/domain/verification";
const analyze = (pack = PACKS[0], text = "") => finalizeAnalysis(pack, text, fixtureFor(pack, text), { fallbackUsed: true, model: "fixture-v1", promptVersion: "test", latencyMs: 0 });
describe("shared completion verification", () => {
    it("rejects negated, quoted, contradictory, and cross-pack false passes", () => {
        const vacuum = PACKS[0];
        for (const text of ["They do not have the same acceleration.", "The forces are equal and opposite.", "Both fall together, although the heavier one accelerates more."]) {
            const a = analyze(vacuum, text);
            expect(verifyReasoning(vacuum, text, a, "teach_back").success).toBe(false);
        }
        const quoted = "Some people claim the heavier object accelerates faster, but that is false. Both accelerate the same.";
        expect(analyze(vacuum, quoted).decision).not.toBe("diagnose");
    });
    it("accepts contrastive causal relations in the active pack only", () => {
        const vacuum = PACKS[0], text = "The heavier object has more gravitational force, but it also has proportionally more inertia, so both objects have the same free-fall acceleration.";
        expect(verifyReasoning(vacuum, text, analyze(vacuum, text), "teach_back").success).toBe(true);
        const collision = PACKS[1], ct = "The forces are equal and opposite, although the car accelerates more because it has less mass.";
        expect(verifyReasoning(collision, ct, analyze(collision, ct), "teach_back").success).toBe(true);
    });
});
