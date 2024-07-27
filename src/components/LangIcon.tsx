import JsIcon from "@/icons/JsIcon";
import PyIcon from "@/icons/PyIcon";
import React from "react";

const LangIcon = ({ language }: { language: string }) => {
  if (language == "javascript")
    return (
      <span className="flex gap-2">
        <JsIcon />
        <span>javascript</span>
      </span>
    );
  if (language == "python")
    return (
      <span className="flex gap-2">
        <PyIcon />
        <span>python</span>
      </span>
    );
};

export default LangIcon;
