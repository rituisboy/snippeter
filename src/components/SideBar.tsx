import { cn } from "@/lib/utils";

import React, { Dispatch, SetStateAction, useState } from "react";
import Library from "./Library";

interface SideBarProps {
  setView: Dispatch<SetStateAction<string>>;
}

const SideBar = ({ setView }: SideBarProps) => {
  const [currentView, setCurrentView] = useState("all");
  const handleSelect = (view: string) => {
    setCurrentView(view);
    setView(view);
  };

  return (
    <div
      className="h-full w-48 border bg-gray-900 flex-col gap-3  hidden sm:flex p-1 divide-x-2
    "
    >
      <div className="h-max w-full text-center text-xl">SideBar</div>
      <div className="border "></div>
      <div className="flex flex-col gap-1 ">
        <div
          onClick={() => handleSelect("all")}
          className={cn(
            "hover:bg-gray-800 h-max p-1  w-full text-center text-xl",
            {
              "bg-gray-800 rounded-md": currentView == "all",
            }
          )}
        >
          All
        </div>
        <div
          onClick={() => handleSelect("fav")}
          className={cn(
            "hover:bg-gray-800 h-max p-1  w-full text-center text-xl",
            {
              "bg-gray-800 rounded-md": currentView == "fav",
            }
          )}
        >
          Favourite
        </div>
        <div className="border border-white" />
        <Library setCurrentView={setCurrentView} currentView={currentView} setView={setView}/>
      </div>
    </div>
  );
};

export default SideBar;
