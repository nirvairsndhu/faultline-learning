import type { Pack } from "@/content/packs";
const tokens=(s:string)=>new Set(s.toLowerCase().match(/[a-z]+/g)||[]);
export const cosineKeywordSimilarity=(a:string,b:string)=>{const x=tokens(a),y=tokens(b);let shared=0;x.forEach(t=>{if(y.has(t))shared++});return shared/Math.sqrt(Math.max(1,x.size)*Math.max(1,y.size));};
export function retrieveCandidates(packs:Pack[], text:string){return packs.map(pack=>({id:pack.id,description:pack.misconception,similarity:cosineKeywordSimilarity(text,pack.misconception)})).sort((a,b)=>b.similarity-a.similarity).slice(0,3);}
