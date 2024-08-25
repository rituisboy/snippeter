import { cn } from "@/lib/utils";
import axios from "axios";
import { Book, BookOpenText, PlusIcon } from "lucide-react";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import useSnippetStore from "@/store";

interface LibrariesProps {
  title: string;
  content: string[];
  _id: string;
}

interface LibraryProps {
  setCurrentView: Dispatch<SetStateAction<string>>;
  setView: Dispatch<SetStateAction<string>>;
  currentView: string;
}

const Library: FC<LibraryProps> = ({
  setCurrentView,
  currentView,
  setView,
}) => {
  const [libraries, setLibraries] = useState<LibrariesProps[]>([]);
  const [addingLib, setAddingLib] = useState(false);
  const { setLibSnippets } = useSnippetStore();

  const handleNewLib = async () => {
    setAddingLib(true);
    const { data } = await axios.post("/api/library");
    setLibraries((prev) => [...prev, data]);
    setAddingLib(false);
  };

  const handleView = async (lib: LibrariesProps) => {
    const val = lib._id;
    const { data } = await axios.get(`/api/library/${val}`);
    setLibSnippets(data);
    setView(val);
    setCurrentView(val);
  };
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/api/library");
      setLibraries(data);
    };
    getData();
  }, []);
  return (
    <>
      <Button
        disabled={addingLib}
        onClick={handleNewLib}
        variant="ghost"
        className="mt-1"
      >
        <div className="flex justify-center items-center gap-2">
          <PlusIcon size={20} /> <span>New Library</span>
        </div>
      </Button>
      {libraries &&
        libraries.map((lib) => (
          <Button
            variant={"ghost"}
            onClick={() => handleView(lib)}
            className={cn("text-lg gap-2", {
              "bg-secondary": currentView == lib._id,
            })}
            key={lib._id}
          >
            <Book size={20} strokeWidth={0.8} />
            {lib.title}
          </Button>
        ))}
    </>
  );
};

export default Library;
