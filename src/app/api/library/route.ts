import Library from "@/models/librarySchema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET() {
  const { userId } = auth();
  const library = await Library.find({ user: userId });

  return new Response(JSON.stringify(library));
}

export async function POST() {
  try {
    const library = await Library.create({ title: "untitled" });

    return new Response(JSON.stringify(library));
  } catch (error) {
    console.log(error?.message!);
  }
}
export async function PATCH(req: NextRequest) {
  const { snipId, libId } = await req.json();
  try {
    const library = await Library.findById(libId);
    library?.content.push(snipId);
    await library?.save();

    return new Response("done");
  } catch (error) {
    console.log(error?.message!);
  }
}
