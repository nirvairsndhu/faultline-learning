import type { Pack } from "@/content/packs";
import type { Analysis } from "@/lib/ai/schemas";
const edge=(source:string,target:string,type:string,evidence:string)=>({source,target,type,evidence});
export type FixtureRaw=Omit<Analysis,"fallbackUsed"|"model"|"promptVersion"|"latencyMs">;
/** Deterministic replacement for only the external model response. */
export function fixtureFor(pack:Pack,text:string):FixtureRaw {
 const contradictory=/\bmaybe\b|not sure|do not know/i.test(text)||(pack.id==="vacuum-drop"&&/equal acceleration.*heavier accelerates more|heavier accelerates more.*equal acceleration/i.test(text))||(pack.id==="collision-forces"&&/both forces are equal.*truck force is greater/i.test(text))||(pack.id==="projectile-motion"&&/no forward force.*continuing forward force/i.test(text));
 const faulty=pack.id==="vacuum-drop"?/mass causes (more |greater )?acceleration|heavier (one )?accelerates faster|more mass makes it fall faster|mass determines free fall acceleration/i.test(text):pack.id==="collision-forces"?/truck has (more mass so it |)exerts more force|truck has more force|truck causes a greater force|smaller car pushes harder|truck force is larger|truck exerts more force/i.test(text):/forward force continues|forward motion needs a continuing forward force|gravity pushes the ball forward|forward force keeps it moving/i.test(text);
 const correct=pack.id==="vacuum-drop"?/same (free-fall )?acceleration|acceleration is independent of mass|proportionally more inertia/i.test(text):pack.id==="collision-forces"?/equal and opposite\b|equal force can still give different acceleration|interaction forces are equal/i.test(text):/no horizontal force|horizontal acceleration is zero|zero horizontal acceleration|velocity, not because a forward force/i.test(text);
 if(contradictory)return {decision:"ask_follow_up",misconceptionId:null,summary:"The explanation contains conflicting or insufficient causal claims.",edges:[],confidence:.42,retrievalSimilarity:.5,contradiction:true};
 if(faulty){const forbidden=pack.forbidden[0];return {decision:"diagnose",misconceptionId:pack.id,summary:pack.misconception,edges:[edge(forbidden.source,forbidden.target,forbidden.type,text.trim())],confidence:.91,retrievalSimilarity:.86,contradiction:false};}
 if(correct)return {decision:"no_misconception",misconceptionId:null,summary:"The stated method matches the authored causal model.",edges:[],confidence:.88,retrievalSimilarity:.22,contradiction:false};
 return {decision:"ask_follow_up",misconceptionId:null,summary:"The explanation does not state a supported causal relation.",edges:[],confidence:.4,retrievalSimilarity:.1,contradiction:true};
}
