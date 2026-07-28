import { describe, expect, it } from "vitest";
import { PACKS, PackSchema, getPack } from "@/content/packs";
import { collisionForces, freeFallTime, projectileAt, vacuumDrop } from "@/lib/domain/physics";
import { evidenceIsExact, graphDiff, validateEdges } from "@/lib/domain/graph-validator";
import { gradeTransfer } from "@/lib/domain/transfer-grader";
import { fixtureFor } from "@/lib/demo/fixtures";
describe("authored deterministic authority", () => {
    it("validates all packs and rejects unknown", () => { expect(PACKS).toHaveLength(3); PACKS.forEach((pack) => PackSchema.parse(pack)); expect(getPack("unknown")).toBeUndefined(); });
    it("uses analytic free-fall time independent of mass", () => { expect(freeFallTime(20)).toBeCloseTo(2.019, 2); const v = vacuumDrop(20, 1, 10); expect(v.timeA).toBe(v.timeB); expect(v.accelerationA).toBe(v.accelerationB); });
    it("keeps collision forces equal and opposite", () => { const f = collisionForces(); expect(f.truck).toBe(-f.car); expect(f.equal).toBe(true); });
    it("models projectile acceleration", () => { const p = projectileAt(2, 5, 3); expect(p.ax).toBe(0); expect(p.ay).toBe(-9.81); expect(p.x).toBe(10); });
    it("checks literal evidence and graph differences", () => { expect(evidenceIsExact("mass causes acceleration", "mass causes")).toBe(true); const d = graphDiff([{ source: "a", target: "b", type: "causes", evidence: "x" }], [{ source: "b", target: "c", type: "causes", evidence: "y" }]); expect(d.removed).toHaveLength(1); expect(d.added).toHaveLength(1); });
    it("rejects forbidden relation", () => { const p = PACKS[0]; const r = validateEdges(p, [{ ...p.forbidden[0], evidence: "mass causes acceleration" }], "mass causes acceleration"); expect(r.forbiddenFound).toBe(true); });
    it("grades transfer by answer and causal method", () => { const r = gradeTransfer(PACKS[2], "none", "There is zero horizontal acceleration and gravity acts vertically."); expect(r.correct && r.methodValid).toBe(true); });
    it("routes contradictory fixture text to follow-up", () => expect(fixtureFor(PACKS[0], "Maybe both, but mass makes acceleration greater").decision).toBe("ask_follow_up"));
});
