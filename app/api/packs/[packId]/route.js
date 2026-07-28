import { NextResponse } from "next/server";
import { getPack, publicPack } from "@/content/packs";
export async function GET(_, { params }) { const p = getPack((await params).packId); return p ? NextResponse.json(publicPack(p)) : NextResponse.json({ error: "Unknown pack" }, { status: 404 }); }
