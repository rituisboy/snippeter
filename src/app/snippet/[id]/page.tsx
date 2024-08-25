"use client";
import { snippetProps } from "@/app/page";
import useSnippetStore from "@/store";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoaderCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import View from "./View";
import Edit from "./Edit";
import { geminiModel, getAiResult } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const Page = ({ params }) => {
  const { id } = params;
  const [snippet, setSnippet] = useState<snippetProps | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [summarizedData, setSummarizedData] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const { snippets } = useSnippetStore();
  const api_key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const str = `*React-Markdown* now supports ~strikethrough~. Thanks to gfm plugin.
            <font color="green">**hello world**</font>`;
  const router = useRouter();

  const handleSummarize = async () => {
    setSummarizing(true);
    const prompt = `generate a summary of the code below in markdown format with bold and colorings: \n\n\`\`\`js\n${snippet?.code}\n\`\`\``;
    const aiRes = await geminiModel.generateContentStream(prompt);
    setSummarizedData("");
    for await (const chunk of aiRes.stream) {
      const chunkText = chunk.text();
      setSummarizedData((prev) => prev + chunkText);
      // return chunkText;
    }
    // const data = await getAiResult(snippet?.code!);
    setSummarizing(false);
  };

  useEffect(() => {
    const snip = snippets.find((snip) => snip._id === id);
    if (snip) {
      setSnippet(snip);
    } else {
      // Fetch snippet from the server if not found in the store
      const fetchSnippet = async () => {
        try {
          const { data } = await axios.get(`/api/create`);

          const snip = data.find((snip: snippetProps) => snip._id === id);

          setSnippet(snip);
        } catch (error) {
          console.error("Error fetching snippet:", error);
        }
      };

      fetchSnippet();
    }
  }, [id, snippets, router]);

  if (!snippet)
    return (
      <div className="flex justify-center items-center w-full h-[calc(100dvh-5rem)]">
        <LoaderCircle size={30} className="animate-spin" />
      </div>
    );
  // if (snippet) console.log(snippet);

  return (
    <div className="flex justify-center items-center flex-col gap-y-10">
      {!editMode ? (
        <View snippet={snippet} setEditMode={setEditMode} />
      ) : (
        <Edit snippet={snippet} setEditMode={setEditMode} />
      )}
      <Button
        variant="ghost"
        className="border bg-black border-2 ring"
        onClick={handleSummarize}
        disabled={summarizing}
      >
        {summarizing ? (
          <Sparkles size={20} className="animate-pulse" />
        ) : (
          <span className="flex gap-3 text-lg  items-center">
            <Sparkles size={20} /> Summarize with AI
          </span>
        )}
      </Button>
      {summarizedData && (
        <>
          {/* <code className="bg-slate-900 border w-[30rem] rounded-md mb-20 p-6 border-white whitespace-pre-line text-justify">
            {summarizedData}
          </code> */}
          <code>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="bg-slate-900 border w-[30rem] rounded-md mb-20 p-6 border-white whitespace-pre-line text-justify"
            >
              {summarizedData}
            </ReactMarkdown>
          </code>
        </>
      )}
      {/* <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {str}
      </ReactMarkdown> */}
    </div>
  );
};

const HighlightedText = ({ text }: { text: string }) => {
  console.log(text);
  // Split the text by backticks and identify code segments
  const parts = text.split(/(`[^`]+`)/g);
  console.log(parts);
  return (
    <code className="bg-slate-900 border w-[30rem] rounded-md mb-20 p-6 border-white whitespace-pre-line text-justify">
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <span
            key={index}
            className="bg-gray-700 text-red-400 font-bold px-1 rounded"
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      )}
    </code>
  );
};

export default Page;
