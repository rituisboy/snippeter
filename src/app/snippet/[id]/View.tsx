import { snippetProps } from "@/app/page";
import CodeSnippet from "@/components/CodeSnippet";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface ViewProps {
  snippet: snippetProps;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const View: FC<ViewProps> = ({ snippet, setEditMode }) => {
  return (
    <>
      <div className="pt-2 flex justify-center text-2xl ">{snippet.title}</div>
      <div>{snippet.description}</div>

      <CodeSnippet
        readOnly={true}
        code={snippet.code}
        language={snippet.language}
      />

      <Button
        onClick={() => setEditMode((prev) => !prev)}
        className="text-xl p-2"
      >
        Edit
      </Button>
    </>
  );
};

export default View;
