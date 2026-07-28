import { NextResponse } from "next/server"; import { z } from "zod"; import { getPack, PACKS } from "@/content/packs"; import { analyzeExplanation } from "@/lib/ai/featherless"; import { verifyReasoning } from "@/lib/domain/verification";
const Input=z.object({packId:z.string().min(1),explanation:z.string().min(1).max(1600),phase:z.enum(["initial","teach_back","transfer"]).optional(),selectedAnswer:z.string().optional()});
export async function POST(req:Request){
 let body:unknown;
 try{body=await req.json();}catch{return NextResponse.json({error:"Invalid analysis request"},{status:400});}
 const parsed=Input.safeParse(body); if(!parsed.success)return NextResponse.json({error:"Invalid analysis request"},{status:400});
 const pack=getPack(parsed.data.packId); if(!pack)return NextResponse.json({error:"Unknown pack"},{status:404});
 try{const analysis=await analyzeExplanation(pack,parsed.data.explanation,PACKS); const phase=parsed.data.phase??"initial"; return NextResponse.json(phase==="initial"?analysis:{analysis,verification:verifyReasoning(pack,parsed.data.explanation,analysis,phase,parsed.data.selectedAnswer)});}catch{return NextResponse.json({error:"Analysis unavailable"},{status:503});}
}
