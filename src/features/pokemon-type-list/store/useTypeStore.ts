import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { ApiResource } from "../../../shared/types/pokemonTypes";
import { fetchTypes as apiFetchTypes } from "../api/fetchTypes";

interface TypeStoreState {
  types: ApiResource[];
  loading: boolean;
  error: string | null;
  fetchTypes: () => Promise<void>;
}

const typeStoreCreator: StateCreator<TypeStoreState> = (set) => ({
  types: [],
  loading: false,
  error: null,

  fetchTypes: async () => {
    set({ loading: true, error: null });
    try {
      const fetchedTypes = await apiFetchTypes();

      const filteredTypes = fetchedTypes.filter(
        (type) => type.name !== "stellar" && type.name !== "unknown"
      );
      set({ types: filteredTypes, loading: false });
    } catch (err) {
      console.warn(err);
      set({ error: "Falha ao buscar tipos.", loading: false });
    }
  },
});

export const useTypeStore = create(typeStoreCreator);
