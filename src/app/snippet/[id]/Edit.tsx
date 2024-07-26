import { snippetProps } from "@/app/page";
import CodeSnippet from "@/components/CodeSnippet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useSnippetStore from "@/store";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface ViewProps {
  snippet: snippetProps;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: FC<ViewProps> = ({ snippet, setEditMode }) => {
  const [language, setLanguage] = useState(snippet.language);

  const [title, setTitle] = useState(snippet.title);
  const [description, setDescription] = useState(snippet.description);
  const [isSaving, setIsSaving] = useState(false);

  const { editCode, setEditCode } = useSnippetStore();

  useEffect(() => {
    setEditCode(snippet.code);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await axios.put("/api/create", {
      id: snippet._id,
      title,
      description,
      code: editCode,
      language,
    });

    toast.success("saved successfully");
    setIsSaving(false);
  };

  return (
    <>
      <div className="pt-2 flex justify-center text-2xl ">
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="text-xl"
        />
      </div>
      <div className="overflow-hidden">
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none w-96 focus:outline-none  focus:ring-2 focus:ring-rose-400 "
          value={description}
        />
      </div>

      <CodeSnippet
        readOnly={false}
        code={snippet.code}
        language={snippet.language}
        setLanguage={setLanguage}
      />
      <div className="flex gap-3">
        <Button
          variant={"destructive"}
          onClick={() => setEditMode((prev) => !prev)}
          className="text-xl p-3"
        >
          Cancel
        </Button>
        <Button variant="sucess" onClick={handleSave} className="text-xl p-3">
          {isSaving ? <Loader2 className="animate-spin" /> : <span>Save</span>}
        </Button>
      </div>
    </>
  );
};

export default Edit;
