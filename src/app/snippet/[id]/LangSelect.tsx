import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LangSelect({
  language,
  setLanguage,
  setEditorLang,
}: {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setEditorLang: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select
      value={language}
      onValueChange={(val) => {
        setLanguage(val);
        setEditorLang(val);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={language} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectSeparator />
          <SelectItem value="javascript">javascript</SelectItem>
          <SelectItem value="python">python</SelectItem>
          <SelectItem value="java">java</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
