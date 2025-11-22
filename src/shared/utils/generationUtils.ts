export interface GenerationInfo {
  id: number;
  name: string;
  region: string;
  slug: string;
}

const toRoman = (num: number): string => {
  const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  return roman[num] || num.toString();
};

export const getGenerationById = (id: number): GenerationInfo => {
  let genNumber = 0;
  let region = "Unknown";

  if (id <= 151) {
    genNumber = 1;
    region = "Kanto";
  } else if (id <= 251) {
    genNumber = 2;
    region = "Johto";
  } else if (id <= 386) {
    genNumber = 3;
    region = "Hoenn";
  } else if (id <= 493) {
    genNumber = 4;
    region = "Sinnoh";
  } else if (id <= 649) {
    genNumber = 5;
    region = "Unova";
  } else if (id <= 721) {
    genNumber = 6;
    region = "Kalos";
  } else if (id <= 809) {
    genNumber = 7;
    region = "Alola";
  } else if (id <= 905) {
    genNumber = 8;
    region = "Galar";
  } else if (id <= 1025) {
    genNumber = 9;
    region = "Paldea";
  } else {
    genNumber = 0;
    region = "Unknown";
  }

  return {
    id: genNumber,
    name: `Generation ${toRoman(genNumber)}`,
    region: region,
    slug: `gen-${genNumber}`,
  };
};
