export interface ApiResource {
  name: string;
  url: string;
}

export interface PokemonTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiResource[];
}

export interface PokemonType {
  slot: number;
  type: ApiResource;
}

export interface PokemonListItemDetail {
  id: number;
  name: string;
  imageUrlNormal: string;
  imageUrlShiny: string;
  types: PokemonType[];
}

export interface Ability {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface GameIndex {
  game_index: number;
  version: { name: string; url: string };
}

export interface LocationArea {
  name: string;
  url: string;
}

export interface EncounterVersionDetail {
  max_chance: number;
  version: { name: string; url: string };
}

export interface PokemonLocation {
  location_area: LocationArea;
  version_details: EncounterVersionDetail[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string; url: string };
  version?: { name: string; url: string };
}

export interface GeneraEntry {
  genus: string;
  language: { name: string; url: string };
}

export interface PokemonSpeciesRaw {
  flavor_text_entries: FlavorTextEntry[];
  genera: GeneraEntry[];
  egg_groups: { name: string; url: string }[];
  gender_rate: number;
  capture_rate: number;
  growth_rate: { name: string };
  evolution_chain: { url: string };
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: { name: string; url: string };
  item: { name: string; url: string } | null;
  held_item: { name: string; url: string } | null;
  min_happiness: number | null;
  min_affection: number | null;
  time_of_day: string;
  location: { name: string } | null;
  known_move_type: { name: string } | null;
}

export interface EvolutionNode {
  species: { name: string; url: string };
  is_baby: boolean;
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionNode[];
}

export interface EvolutionChainResponse {
  chain: EvolutionNode;
  id: number;
}

export interface ProcessedEvolution {
  id: number;
  name: string;
  imageUrl: string;
  condition: string;
  evolvesTo: ProcessedEvolution[];
}

export interface PokemonDetailFull {
  id: number;
  name: string;
  imageUrlNormal: string;
  imageUrlShiny: string;
  types: { slot: number; type: { name: string; url: string } }[];
  height: number;
  weight: number;
  abilities: Ability[];
  gameIndices: GameIndex[];
  cries: { latest: string; legacy: string | null };
  stats: { base_stat: number; stat: { name: string } }[];

  encounters: PokemonLocation[];
  flavorText: string;
  category: string;
  genderRate: number;
  eggGroups: string[];
  evolutionChainUrl: string;
  evolutionChain: ProcessedEvolution;
}
