import type { Pack } from "@/content/packs";
import type { Analysis } from "@/lib/ai/schemas";
const edge=(source:string,target:string,type:string,evidence:string)=>({source,target,type,evidence});
export type FixtureRaw=Omit<Analysis,"fallbackUsed"|"model"|"promptVersion"|"latencyMs">;

const sentence=(text:string, pattern:RegExp)=>text.split(/(?<=[.!?;])\s+/).find(part=>pattern.test(part)) ?? text.trim();
const rejected=(text:string, claim:RegExp)=>{
 const hit=sentence(text,claim); return claim.test(hit) && /\b(not|wrong|false|misconception|do not|does not|isn't|is not)\b/i.test(hit);
};
/** Disclosed, pack-specific fallback extraction. It emits relations, never a completion verdict. */
export function fixtureFor(pack:Pack,text:string):FixtureRaw {
 const uncertain=/\b(maybe|not sure|do not know|cannot reconcile|perhaps)\b/i.test(text);
 const out=(decision:FixtureRaw["decision"],edges:FixtureRaw["edges"],contradiction=false,summary="The explanation does not state a supported causal relation."):FixtureRaw=>({decision,misconceptionId:decision==="diagnose"?pack.id:null,summary,edges,confidence:decision==="ask_follow_up"?.42:.9,retrievalSimilarity:decision==="diagnose"?.86:.22,contradiction});
 if(pack.id==="vacuum-drop"){
 const falseClaim=/heavier (object|one|mass).*accelerat(?:es|ion).*(faster|more)|mass (causes|determines|makes).*accelerat|more mass makes.*fall faster/i;
  const correct=/same (free[- ]fall )?acceleration|acceleration (is )?independent of mass|both accelerate the same|mass does not cause|proportionally more inertia/i;
  const bad=falseClaim.test(text)&&!rejected(text,falseClaim); const good=correct.test(text);
  if(/\b(do not|don't|does not|doesn't|not)\b[^.]{0,35}same (free[- ]fall )?acceleration/i.test(text))return out("ask_follow_up",[],true,"The explanation rejects the required relation.");
  if(uncertain||bad&&good)return out("ask_follow_up",[...(bad?[edge("mass","acceleration","causes",sentence(text,falseClaim))]:[]),...(good?[edge("mass","acceleration","has_no_acceleration",sentence(text,correct))]:[])],true,"The explanation contains conflicting or insufficient causal claims.");
  if(bad)return out("diagnose",[edge("mass","acceleration","causes",sentence(text,falseClaim))],false,pack.misconception);
  if(good)return out("no_misconception",[edge("mass","acceleration","has_no_acceleration",sentence(text,correct))],false,"The stated method matches the authored causal model.");
 }
 if(pack.id==="collision-forces"){
  const falseClaim=/truck.*((exerts|pushes|causes).*?(more|greater|larger) force|force is (more|greater|larger))|truck has more force|car pushes harder|car.*pushes harder|car.*acceleration.*therefore.*pushes harder/i;
  const correct=/equal( magnitude| force)?( and|,)? opposite|interaction forces are equal|equal force can still give different acceleration/i;
  const bad=falseClaim.test(text)&&!rejected(text,falseClaim); const good=correct.test(text);
  if(uncertain||/both forces are equal and.*greater/i.test(text))return out("ask_follow_up",[],true,"The explanation contains conflicting or insufficient causal claims.");
  if(bad)return out("diagnose",[edge("truck","carForce","causes",sentence(text,falseClaim))],false,pack.misconception);
  if(good)return out("no_misconception",[edge("truckForce","carForce","equal_to",sentence(text,correct))],false,"The stated method matches the authored causal model.");
 }
 const falseClaim=/forward force (continues|keeps|maintains)|forward motion needs a continuing forward force|gravity pushes.*forward/i;
 const correct=/no horizontal force|horizontal acceleration is zero|zero horizontal acceleration|not because a forward force|not a continuing forward force/i;
 const bad=falseClaim.test(text)&&!rejected(text,falseClaim); const good=correct.test(text);
 if(uncertain)return out("ask_follow_up",[],true,"The explanation contains conflicting or insufficient causal claims.");
 if(bad)return out("diagnose",[edge("horizontalForce","horizontalAcceleration","causes",sentence(text,falseClaim))],false,pack.misconception);
 if(good)return out("no_misconception",[edge("release","horizontalAcceleration","has_no_acceleration",sentence(text,correct))],false,"The stated method matches the authored causal model.");
 return out("ask_follow_up",[],true);
}
