import connect from "@/lib/connect";
import Snippet from "@/models/snippetSchema";

export async function DELETE(req: Request) {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Snippet.findByIdAndDelete(id);
  return new Response("", { status: 200 });
}
