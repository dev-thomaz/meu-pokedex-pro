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
