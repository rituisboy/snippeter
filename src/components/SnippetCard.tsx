"use client";
import { snippetProps } from "@/app/page";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Heart } from "lucide-react";
import axios from "axios";

const SnippetCard = ({
  snippet,
  setSnippets,
}: {
  snippet: snippetProps;
  setSnippets: Dispatch<SetStateAction<snippetProps[]>>;
}) => {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(snippet.favourite || false);

  const handleClick = () => {
    router.push(`/snippet/${snippet._id}`);
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    await axios.delete(`/api/delete?id=${snippet._id}`);

    setSnippets((prev) => prev.filter((snip) => snip._id != snippet._id));
  };

  const handleFavourite = async () => {
    setIsFavourite(!isFavourite);

    await axios.post(
      `/api/favourite`,
      { id: snippet._id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer size-64 rounded-[2rem] border flex justify-center items-center duration-500
       bg-zinc-900 hover:shadow-lg transform transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 flex gap-3"
      >
        <div onClick={handleFavourite}>
          <Heart size={22} fill={isFavourite ? "red" : ""} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuLabel>Setting</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0" onClick={handleDelete}>
              <span className="hover:bg-red-700 w-full px-2 rounded-lg p-1">
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {snippet.title}
    </div>
  );
};

export default SnippetCard;
