import Library from "@/models/librarySchema";

export async function GET(req: Request, context: any) {
  const { params } = context;
  const snippets = await Library.findById(params.id).populate("content");

  return new Response(JSON.stringify(snippets?.content));
}
