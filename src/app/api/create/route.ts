import connect from "@/lib/connect";
import Snippet from "@/models/snippetSchema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST() {
  const { userId } = auth();
  await connect();

  const snippet = await Snippet.create({
    title: "New Snippet",
    description: "New Description",
    code: `console.log("hello world")`,
    user: userId,
  });

  return new Response(JSON.stringify(snippet));
}

export async function GET() {
  const { userId } = auth();
  await connect();
  const snippets = await Snippet.find({ user: userId });
  return new Response(JSON.stringify(snippets), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  const snippet = await Snippet.findByIdAndUpdate(data.id, data, { new: true });

  return new Response(JSON.stringify(snippet));
}
