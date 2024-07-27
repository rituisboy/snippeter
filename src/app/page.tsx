"use client";
import CreateSnippet from "@/components/CreateSnippet";
import SideBar from "@/components/SideBar";
import SnippetCard from "@/components/SnippetCard";
import useSnippetStore from "@/store";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export interface snippetProps {
  _id: string;
  title: string;
  description: string;
  code: string;
  __v: number;
  favourite: boolean;
  language: string;
}

export default function Home() {
  const [snippets, setSnippets] = useState<snippetProps[]>([]);
  const setSnippetsStore = useSnippetStore((state) => state.setSnippets);
  const { snippets: storedSnippet } = useSnippetStore();
  const [view, setView] = useState("all");
  const [inputState, setInputState] = useState("");

  useEffect(() => {
    const fetchSnippets = async () => {
      const { data } = await axios.get("/api/create");

      setSnippetsStore(data);

      setSnippets(data);
    };

    fetchSnippets();
  }, [setSnippetsStore]);

  useEffect(() => {
    const newSnippets = storedSnippet.filter((snip) =>
      snip.title.toLowerCase().includes(inputState.toLowerCase())
    );
    setSnippets(newSnippets);
  }, [inputState]);

  useEffect(() => {
    if (snippets) {
      if (view == "fav")
        setSnippets((prev) => prev.filter((snip) => snip.favourite));
      if (view == "all" && storedSnippet) setSnippets(storedSnippet);
    }
  }, [view]);

  return (
    <div className="flex h-[calc(100dvh-5rem)] ">
      <SideBar setView={setView} />
      <div className="flex flex-col w-full">
        <div className="w-full h-20 flex justify-center items-center ">
          <div className="flex relative">
            <input
              onChange={(e) => setInputState(e.target.value)}
              type="text"
              className="w-96 p-3 rounded-full bg-slate-700"
            />
            <Search className="absolute translate-x-2 translate-y-3 right-4" />
          </div>
        </div>
        <div
          className="p-3 gap-1 grid ml-4
        overflow-y-auto md:grid-cols-2 xl:grid-cols-5  lg:grid-cols-3
        flex justify-around items-center
        "
        >
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              setSnippets={setSnippets}
            />
          ))}
          <CreateSnippet setSnippets={setSnippets} />
        </div>
      </div>
    </div>
  );
}
