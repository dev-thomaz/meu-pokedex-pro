import { create } from "zustand";

type SpriteMode = "normal" | "shiny";

interface GlobalSettingsState {
  spriteMode: SpriteMode;
  toggleSpriteMode: () => void;
}

export const useGlobalSettingsStore = create<GlobalSettingsState>((set) => ({
  spriteMode: "normal",

  toggleSpriteMode: () =>
    set((state) => ({
      spriteMode: state.spriteMode === "normal" ? "shiny" : "normal",
    })),
}));
