import type { AxiosResponse } from "axios";
import { api } from "../../../shared/api/axiosInstance";
import type {
  PokemonListItemDetail,
  ApiResource,
} from "../../../shared/types/pokemonTypes";

interface TypeDetailsResponse {
  pokemon: { pokemon: { url: string } }[];
}

interface AllPokemonListResponse {
  results: ApiResource[];
}

interface PokemonDetailResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;

    back_default?: string | null;
    back_shiny?: string | null;

    other: {
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
      home: {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
  types: { slot: number; type: { name: string; url: string } }[];
}

export const fetchPokemonByType = async (
  typeName: string
): Promise<PokemonListItemDetail[]> => {
  let detailUrls: string[] = [];
  const lowerTypeName = typeName.toLowerCase();

  if (lowerTypeName === "all") {
    const allListResponse = await api.get<AllPokemonListResponse>(
      "/pokemon?limit=2000"
    );

    detailUrls = allListResponse.data.results.map((entry) => entry.url);
  } else {
    const typeListResponse = await api.get<TypeDetailsResponse>(
      `/type/${lowerTypeName}`
    );

    detailUrls = typeListResponse.data.pokemon.map(
      (entry) => entry.pokemon.url
    );
  }

  const detailPromises: Promise<AxiosResponse<PokemonDetailResponse>>[] =
    detailUrls.map((url) => api.get<PokemonDetailResponse>(url));

  const detailResponses = await Promise.all(detailPromises);

  const detailedList: PokemonListItemDetail[] = detailResponses.map((res) => {
    const data = res.data;

    const officialArt = data.sprites.other["official-artwork"];
    const homeArt = data.sprites.other.home;

    const imageUrlNormal =
      officialArt.front_default ||
      homeArt.front_default ||
      data.sprites.front_default ||
      "";

    const imageUrlShiny =
      officialArt.front_shiny ||
      homeArt.front_shiny ||
      data.sprites.front_shiny ||
      "";

    return {
      id: data.id,
      name: data.name,
      imageUrlNormal: imageUrlNormal,
      imageUrlShiny: imageUrlShiny,
      types: data.types.map((t) => ({ slot: t.slot, type: t.type })),
    };
  });

  return detailedList;
};
