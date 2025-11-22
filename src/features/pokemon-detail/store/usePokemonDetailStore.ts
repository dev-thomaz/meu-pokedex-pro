import { create } from "zustand";
import type { PokemonDetailFull } from "../../../shared/types/pokemonTypes";
import { fetchPokemonDetail } from "../api/fetchPokemonDetail";

interface DetailState {
  pokemon: PokemonDetailFull | null;
  loading: boolean;
  error: string | null;

  fetchDetail: (identifier: string | number) => Promise<void>;

  clearDetail: () => void;
}

export const usePokemonDetailStore = create<DetailState>((set) => ({
  pokemon: null,
  loading: false,
  error: null,

  fetchDetail: async (identifier) => {
    set({ loading: true, error: null, pokemon: null });
    try {
      const data = await fetchPokemonDetail(identifier);
      set({ pokemon: data, loading: false });
    } catch (err) {
      console.error(err);
      set({
        error: "Não foi possível carregar os detalhes do Pokémon.",
        loading: false,
      });
    }
  },

  clearDetail: () => set({ pokemon: null, error: null, loading: false }),
}));
