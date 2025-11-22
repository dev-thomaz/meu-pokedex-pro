export const ICON_START_COLORS: { [key: string]: string } = {
  bug: "#9f9f28",
  dark: "#4f4747",
  dragon: "#576fbc",
  electric: "#dfbc28",
  fairy: "#e18ce1",
  fighting: "#e49021",
  fire: "#e4613e",
  flying: "#74aad0",
  ghost: "#6f4570",
  grass: "#439837",
  ground: "#a4733c",
  ice: "#fbfdfd",
  normal: "#828282",
  poison: "#9354cb",
  psychic: "#e96c8c",
  rock: "#a9a481",
  steel: "#77b2cb",
  water: "#3099e1",
};

export const CARD_END_COLORS: { [key: string]: string } = {
  normal: "#a8a878",
  fire: "#f08030",
  water: "#6890f0",
  grass: "#78c850",
  electric: "#f8d030",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
  stellar: "#44628d",
  unknown: "#68a090",
};

const LIGHT_BACKGROUND_TYPES = [
  "normal",
  "flying",
  "electric",
  "fairy",
  "ice",
  "steel",
  "rock",
  "ground",
];

export const getCardBackground = (types: string[]): string => {
  const type1 = types[0].toLowerCase();

  const startColor = ICON_START_COLORS[type1] || "#ccc";

  const endColor = CARD_END_COLORS[type1] || "#999";

  if (types.length > 1) {
    const type2 = types[1].toLowerCase();
    const secondColor = CARD_END_COLORS[type2] || endColor;

    return `linear-gradient(to bottom, ${startColor}, ${secondColor})`;
  }

  return `linear-gradient(to right, ${startColor}, ${endColor})`;
};

export const getTextColor = (primaryType: string): string => {
  const typeName = primaryType.toLowerCase();

  if (LIGHT_BACKGROUND_TYPES.includes(typeName)) {
    return "#212121";
  }

  return "#ffffff";
};
