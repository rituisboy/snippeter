"use client";
import useSnippetStore from "@/store";
import React from "react";

const Page = () => {
  const { snippets } = useSnippetStore();
  console.log(snippets);

  console.log();
  return <div>Page</div>;
};

export default Page;
