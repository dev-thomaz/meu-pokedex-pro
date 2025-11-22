import { create } from "zustand";

type SpriteMode = "normal" | "shiny";

export interface GlobalSettingsState {
  spriteMode: SpriteMode;
  toggleSpriteMode: () => void;

  searchTerm: string;
  setSearchTerm: (term: string) => void;

  selectedGenerations: number[];
  setSelectedGenerations: (generations: number[]) => void;
}

export const useGlobalSettingsStore = create<GlobalSettingsState>((set) => ({
  spriteMode: "normal",
  searchTerm: "",
  selectedGenerations: [],

  toggleSpriteMode: () =>
    set((state) => ({
      spriteMode: state.spriteMode === "normal" ? "shiny" : "normal",
    })),

  setSearchTerm: (term: string) =>
    set({
      searchTerm: term,
    }),

  setSelectedGenerations: (generations: number[]) =>
    set({
      selectedGenerations: generations,
    }),
}));
