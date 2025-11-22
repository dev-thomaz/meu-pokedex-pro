type SpriteMode = "normal" | "shiny";

export const getSpriteUrl = (
  pokemonItem: { imageUrlNormal: string; imageUrlShiny: string },
  style: SpriteMode
): string => {
  if (style === "shiny") {
    return pokemonItem.imageUrlShiny || pokemonItem.imageUrlNormal;
  }
  return pokemonItem.imageUrlNormal;
};
