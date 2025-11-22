import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { PokemonListItemDetail } from "../../../shared/types/pokemonTypes";
import { fetchPokemonByType as apiFetchByType } from "../api/fetchPokemonByType";

interface TypeListState {
  pokemonList: PokemonListItemDetail[];
  loading: boolean;
  error: string | null;
  fetchList: (typeName: string) => Promise<void>;
}

const typeListCreator: StateCreator<TypeListState> = (set) => ({
  pokemonList: [],
  loading: false,
  error: null,

  fetchList: async (typeName: string) => {
    set({ loading: true, error: null, pokemonList: [] });
    try {
      const data = await apiFetchByType(typeName);

      set({ pokemonList: data, loading: false });
    } catch (err) {
      console.error(err);
      set({
        error: `Falha ao carregar Pokémon do tipo ${typeName}.`,
        loading: false,
      });
    }
  },
});

export const usePokemonByTypeStore = create(typeListCreator);
