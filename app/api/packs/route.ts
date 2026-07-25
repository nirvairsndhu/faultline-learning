import { NextResponse } from "next/server"; import { PACKS, publicPack } from "@/content/packs";
export function GET(){return NextResponse.json(PACKS.map(publicPack));}
