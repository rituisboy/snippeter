"use client";
import { snippetProps } from "@/app/page";
import useSnippetStore from "@/store";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import View from "./View";
import Edit from "./Edit";

const Page = ({ params }) => {
  const { id } = params;
  const [snippet, setSnippet] = useState<snippetProps | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const { snippets } = useSnippetStore();

  const router = useRouter();

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
    </div>
  );
};

export default Page;
