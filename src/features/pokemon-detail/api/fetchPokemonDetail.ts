import { api } from "../../../shared/api/axiosInstance";
import type {
  PokemonDetailFull,
  PokemonLocation,
  PokemonSpeciesRaw,
  EvolutionChainResponse,
  EvolutionNode,
  ProcessedEvolution,
  EvolutionDetail,
} from "../../../shared/types/pokemonTypes";

interface PokemonRawResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string; url: string } }[];
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  game_indices: {
    game_index: number;
    version: { name: string; url: string };
  }[];
  cries: { latest: string; legacy: string };
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
      home: { front_default: string | null; front_shiny: string | null };
    };
  };
  location_area_encounters: string;
}

const cleanFlavorText = (text: string) => {
  return text
    .replace(/\f/g, "\n")
    .replace(/\u00ad\n/g, "")
    .replace(/\u00ad/g, "")
    .replace(/ -\n/g, " - ")
    .replace(/-\n/g, "-")
    .replace(/\n/g, " ");
};

const getIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
};

const formatEvolutionCondition = (details: EvolutionDetail[]): string => {
  if (!details || details.length === 0) return "";

  const d = details[0];

  if (d.trigger.name === "trade" && d.held_item) {
    return `Trade w/ ${d.held_item.name.replace(/-/g, " ")}`;
  }

  if (d.trigger.name === "trade") return "Trade";

  if (d.item) return d.item.name.replace(/-/g, " ");

  if (d.min_happiness && d.time_of_day) {
    return `Happy + ${d.time_of_day}`;
  }

  if (d.min_happiness) return "High Happiness";

  if (d.location) return `Near ${d.location.name.replace(/-/g, " ")}`;

  if (d.known_move_type) return `${d.known_move_type.name} Move`;

  if (d.min_level) return `Lvl ${d.min_level}`;

  return "Special Condition";
};

const buildEvolutionTree = (node: EvolutionNode): ProcessedEvolution => {
  const id = getIdFromUrl(node.species.url);

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const condition = formatEvolutionCondition(node.evolution_details);

  return {
    id,
    name: node.species.name,
    imageUrl,
    condition,

    evolvesTo: node.evolves_to.map((child) => buildEvolutionTree(child)),
  };
};

export const fetchPokemonDetail = async (
  identifier: string | number
): Promise<PokemonDetailFull> => {
  const response = await api.get<PokemonRawResponse>(`/pokemon/${identifier}`);
  const data = response.data;

  const [encountersResponse, speciesResponse] = await Promise.all([
    api.get<PokemonLocation[]>(data.location_area_encounters),
    api.get<PokemonSpeciesRaw>(`/pokemon-species/${data.id}`),
  ]);
  const encountersData = encountersResponse.data;
  const speciesData = speciesResponse.data;

  const evolutionResponse = await api.get<EvolutionChainResponse>(
    speciesData.evolution_chain.url
  );

  const evolutionTree = buildEvolutionTree(evolutionResponse.data.chain);

  const englishEntry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  const flavorText = englishEntry
    ? cleanFlavorText(englishEntry.flavor_text)
    : "No description available.";

  const englishGenus = speciesData.genera.find(
    (entry) => entry.language.name === "en"
  );
  const category = englishGenus
    ? englishGenus.genus.replace(" Pokémon", "")
    : "Unknown";

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
    imageUrlNormal,
    imageUrlShiny,
    types: data.types,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    gameIndices: data.game_indices,
    cries: data.cries,
    stats: data.stats,
    encounters: encountersData,

    flavorText: flavorText,
    category: category,
    genderRate: speciesData.gender_rate,
    eggGroups: speciesData.egg_groups.map((g) => g.name),
    evolutionChainUrl: speciesData.evolution_chain.url,

    evolutionChain: evolutionTree,
  };
};
