"use client";
import { Check, Copy } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { LangSelect } from "@/app/snippet/[id]/LangSelect";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";

import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-tomorrow_night";
// import "ace-builds/src-noconflict/theme-terminal";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-modelist";
import "ace-builds/src-noconflict/ext-themelist";
import ace from "ace-builds/src-noconflict/ace";

// import ACE from "ace-builds";
import useSnippetStore from "@/store";
import JsIcon from "@/icons/JsIcon";
import PyIcon from "@/icons/PyIcon";
import LangIcon from "./LangIcon";

const CodeSnippet = ({
  code,
  readOnly = false,
  language,
  setLanguage,
}: {
  code: string;
  readOnly: boolean;
  language: string;
  setLanguage?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showCopy, setShowCopy] = useState<boolean>(false);
  const [editorCode, setEditorCode] = useState(code);
  const [editorLang, setEditorLang] = useState(language || "javascript");
  const [theme, setTheme] = useState("dracula");
  const editorRef = useRef(null);
  const { editCode, setEditCode } = useSnippetStore();

  const modelist = ace.require("ace/ext/modelist");
  const { themesByName } = ace.require("ace/ext/themelist");

  useEffect(() => {
    // const editor = ACE.edit(editorRef?.current!);
    // editor.session.setMode(`ace/mode/${language}`);
    // editor.setTheme(`ace/theme/${theme}`);
    // editor.setOptions({
    //   enableBasicAutocompletion: true,
    //   enableLiveAutocompletion: true,
    //   enableSnippets: true,
    //   showLineNumbers: true,
    //   tabSize: 2,
    //   readOnly: readOnly,
    //   cursorStyle: "wide",
    // });
    // editor.setFontSize(15);
    // editor.setValue(code);
    // return () => {
    //   editor.destroy();
    // };

    if (!readOnly) {
      setEditCode(code);
      setEditCode(editCode);
    }
  }, []);

  const handleClick = () => {
    navigator.clipboard.writeText(code);
    setShowCopy(true);
    setTimeout(() => {
      setShowCopy(false);
    }, 1000);
  };

  const handleChange = (val: string) => {
    setEditCode(val);
    setEditorCode(val);
  };
  return (
    <div className="w-[40vw]">
      <div className="rounded-t-xl  bg-[#35353e] p-2 px-5 flex justify-between items-center">
        {!readOnly ? (
          <LangSelect
            language={language}
            setLanguage={setLanguage!}
            setEditorLang={setEditorLang}
          />
        ) : (
          <div className="flex text-muted-foreground gap-2">
            <LangIcon language={language} />
          </div>
        )}

        <div
          onClick={handleClick}
          className="rounded-t-xl  bg-[#35353e] p-2 px-5 "
        >
          {showCopy ? (
            <div className="flex gap-2 justify-center items-center text-sm">
              <Check size={16} /> <span>copied</span>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center text-sm ">
              <Copy size={16} /> <span>Copy</span>
            </div>
          )}
        </div>
      </div>
      <AceEditor
        className="border rounded-b-xl"
        onChange={handleChange}
        mode={editorLang}
        theme={theme}
        name="blah2"
        fontSize={15}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        width="100%" // Make the width responsive
        minLines={5} // Set minimum number of lines
        maxLines={Infinity}
        value={editorCode}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          readOnly: readOnly,
          cursorStyle: "wide",
        }}
      />

      {/* <div
        ref={editorRef}
        style={{
          height: "500px",
          width: "100%",
        }}
      ></div> */}
    </div>
  );
};

export default CodeSnippet;
