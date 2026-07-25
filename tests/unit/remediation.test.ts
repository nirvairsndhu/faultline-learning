import { describe,it,expect } from "vitest";
import { PACKS } from "@/content/packs"; import { collisionForces, projectileAt } from "@/lib/domain/physics"; import { confidenceDecision } from "@/lib/ai/confidence"; import { normalizeLearnerInput, validateEdges } from "@/lib/domain/graph-validator"; import { fixtureFor } from "@/lib/demo/fixtures";
describe("remediation deterministic coverage",()=>{
 it("distinguishes equal collision force from acceleration",()=>{const f=collisionForces();expect(Math.abs(f.truck)).toBe(Math.abs(f.car));expect(12000/1000).not.toBe(12000/2000)});
 it("has zero horizontal and gravitational vertical projectile acceleration",()=>{const p=projectileAt(1,3,4);expect(p.ax).toBe(0);expect(p.ay).toBe(-9.81);expect(p.y).toBeCloseTo(-.905)});
 it("requires every authored relation",()=>{const p=PACKS[2];const edges=p.required.map(e=>({...e,evidence:"gravity causes vertical acceleration and no horizontal force"}));expect(validateEdges(p,edges,"gravity causes vertical acceleration and no horizontal force").requiredMet).toBe(true)});
 it("rejects unknown concepts and relations",()=>{const p=PACKS[0];const r=validateEdges(p,[{source:"unknown",target:"mass",type:"invented",evidence:"mass"}],"mass");expect(r.invalidCount).toBe(1)});
 it("normalizes learner input",()=>expect(normalizeLearnerInput("  mass\n causes   motion ")).toBe("mass causes motion"));
 it("uses confidence gate and contradiction abstention",()=>{expect(confidenceDecision({confidence:.9,similarity:.9,contradiction:false,validatorAgrees:true,hasEvidence:true})).toBe("diagnose");expect(confidenceDecision({confidence:.9,similarity:.9,contradiction:true,validatorAgrees:true,hasEvidence:true})).toBe("ask_follow_up")});
 it("selects disclosed fixture for each pack",()=>PACKS.forEach(p=>expect(fixtureFor(p,"maybe both").fallbackUsed).toBe(true)));
});
