import { api } from "../../../shared/api/axiosInstance";
import type {
  PokemonTypeResponse,
  ApiResource,
} from "../../../shared/types/pokemonTypes";

export const fetchTypes = async (): Promise<ApiResource[]> => {
  const response = await api.get<PokemonTypeResponse>("/type");

  return response.data.results;
};
