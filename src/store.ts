import { create } from "zustand";
import { snippetProps } from "./app/page";

interface SnippetState {
  snippets: snippetProps[];
  setSnippets: (data: snippetProps[]) => void;
  editCode: string;
  setEditCode: (data: string) => void;
}
const useSnippetStore = create<SnippetState>((set) => ({
  snippets: [],
  setSnippets: (data: snippetProps[]) => set({ snippets: data }),
  editCode: "",
  setEditCode: (data: string) => set({ editCode: data }),
}));

export default useSnippetStore;
