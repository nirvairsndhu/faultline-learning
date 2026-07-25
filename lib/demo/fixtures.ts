import type { Pack } from "@/content/packs";
import type { Analysis } from "@/lib/ai/schemas";
const edge = (source:string,target:string,type:string,evidence:string)=>({source,target,type,evidence});
export function fixtureFor(pack: Pack, text: string): Analysis {
 const lower=text.toLowerCase(); const ambiguous=/not sure|maybe|both|but/i.test(lower); const correct=/same acceleration|equal and opposite|no horizontal force|gravity.*vertical/i.test(lower);
 if (ambiguous) return {decision:"ask_follow_up",misconceptionId:null,summary:"The explanation contains conflicting or insufficient causal claims.",edges:[],confidence:.42,retrievalSimilarity:.5,contradiction:true,fallbackUsed:true,model:"fixture-v1",promptVersion:"2026-07-25",latencyMs:0};
 if (correct) return {decision:"no_misconception",misconceptionId:null,summary:"The stated method matches the authored causal model.",edges:pack.required.map((e)=>edge(e.source,e.target,e.type, text.slice(0, Math.min(text.length,80)))),confidence:.88,retrievalSimilarity:.22,contradiction:false,fallbackUsed:true,model:"fixture-v1",promptVersion:"2026-07-25",latencyMs:0};
 const forbidden=pack.forbidden[0]; return {decision:"diagnose",misconceptionId:pack.id,summary:pack.misconception,edges:[edge(forbidden.source,forbidden.target,forbidden.type,text.trim()||"No explanation supplied")],confidence:.91,retrievalSimilarity:.86,contradiction:false,fallbackUsed:true,model:"fixture-v1",promptVersion:"2026-07-25",latencyMs:0};
}
