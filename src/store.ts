import { create } from "zustand";
import { snippetProps } from "./app/page";

interface SnippetState {
  snippets: snippetProps[];
  setSnippets: (data: snippetProps[]) => void;
  libSnippets: snippetProps[];
  setLibSnippets: (data: snippetProps[]) => void;
  editCode: string;
  setEditCode: (data: string) => void;
}
const useSnippetStore = create<SnippetState>((set) => ({
  snippets: [],
  setSnippets: (data: snippetProps[]) => set({ snippets: data }),
  libSnippets: [],
  setLibSnippets: (data: snippetProps[]) => set({ libSnippets: data }),
  editCode: "",
  setEditCode: (data: string) => set({ editCode: data }),
}));

export default useSnippetStore;
