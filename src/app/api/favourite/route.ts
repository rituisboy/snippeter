import connect from "@/lib/connect";
import Snippet from "@/models/snippetSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const snippet = await Snippet.findById(id);
  snippet!.favourite = !snippet!.favourite;

  await snippet.save();
  return NextResponse.json({ status: 200 });
}
