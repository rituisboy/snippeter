"use client";

import { snippetProps } from "@/app/page";
import axios from "axios";
import { LoaderIcon, Plus } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";

const CreateSnippet = ({
  setSnippets,
}: {
  setSnippets: Dispatch<SetStateAction<snippetProps[]>>;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = async () => {
    setIsClicked(true);

    const { data } = await axios.post("/api/create");

    setSnippets((prev: any) => [...prev, data]);
    setIsClicked(false);
  };
  return (
    <Button
      variant={"outline"}
      onClick={handleClick}
      className="size-64 rounded-[2rem] border flex justify-center items-center bg-zinc-900 "
    >
      {isClicked ? (
        <LoaderIcon size={100} className="animate-spin" />
      ) : (
        <Plus size={100} strokeWidth={0.5} />
      )}
    </Button>
  );
};

export default CreateSnippet;
