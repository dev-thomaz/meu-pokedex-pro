import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { ApiResource } from "../../../shared/types/pokemonTypes";
import { fetchTypes as apiFetchTypes } from "../api/fetchTypes";

const ALL_TYPE_RESOURCE: ApiResource = {
  name: "all",
  url: "https://pokeapi.co/api/v2/pokemon?limit=2000",
};

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

      const finalTypes = [ALL_TYPE_RESOURCE, ...filteredTypes];
      console.log(finalTypes);

      set({ types: finalTypes, loading: false });
    } catch (err) {
      console.warn(err);
      set({ error: "Falha ao buscar tipos.", loading: false });
    }
  },
});

export const useTypeStore = create(typeStoreCreator);
