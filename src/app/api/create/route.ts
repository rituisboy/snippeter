import connect from "@/lib/connect";
import Snippet from "@/models/snippetSchema";
import { NextRequest } from "next/server";

export async function POST() {
  await connect();

  const snippet = await Snippet.create({
    title: "New Snippet",
    description: "New Description",
    code: "New Code",
  });

  return new Response(JSON.stringify(snippet));
}

export async function GET() {
  await connect();
  const snippets = await Snippet.find();
  return new Response(JSON.stringify(snippets), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  const snippet = await Snippet.findByIdAndUpdate(data.id, data, { new: true });

  // if (snippet) {
  //   snippet.title = data.title;
  //   snippet.description = data.description;
  //   snippet.code = data.code;
  // }
  // await snippet?.save();

  return new Response(JSON.stringify(snippet));
}
