"use client";
import AddOrCreateNew from "@/components/AddOrCreateNew";
import CreateSnippet from "@/components/CreateSnippet";
import SideBar from "@/components/SideBar";
import SnippetCard from "@/components/SnippetCard";
import useSnippetStore from "@/store";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
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
  const [snippets, setSnippets] = useState<snippetProps[] | []>([]);
  const setSnippetsStore = useSnippetStore((state) => state.setSnippets);
  const { snippets: storedSnippet, libSnippets } = useSnippetStore();
  const [view, setView] = useState("all");
  const [inputState, setInputState] = useState("");

  const { isSignedIn } = useAuth();

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const { data } = await axios.get("/api/create");

        setSnippetsStore(data);

        setSnippets(data);
      } catch (error) {
        console.log(error);
      }
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
      if (view == "fav") {
        const newSnip = storedSnippet.filter((snip) => snip.favourite);
        console.log(newSnip);
        setSnippets(newSnip);
        // setSnippets(storedSnippet.filter((snip) => snip.favourite));
      } else if (view == "all" && storedSnippet) {
        setSnippets(storedSnippet);
      } else {
        setSnippets(libSnippets);
      }
    }
  }, [view]);

  if (!isSignedIn) <RedirectToSignIn />;

  return (
    <div className="flex h-[calc(100dvh-5rem)]">
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
          className="p-3 gap-1 grid ml-4 min-h-72 gap-y-5
        overflow-y-auto md:grid-cols-2 xl:grid-cols-5  lg:grid-cols-3
        flex justify-around items-center
        "
        >
          {snippets &&
            snippets.length > 0 &&
            snippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                setSnippets={setSnippets}
              />
            ))}
          {view == "all" && <CreateSnippet setSnippets={setSnippets} />}
          {view != "all" && view != "fav" && <AddOrCreateNew view={view} />}
        </div>
      </div>
    </div>
  );
}
