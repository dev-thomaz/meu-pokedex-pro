import styles from "./PokemonTypeIcon.module.scss";
import type { SVGProps } from "react";

import NormalIcon from "../../assets/icons/types/normal.svg?react";
import FireIcon from "../../assets/icons/types/fire.svg?react";
import WaterIcon from "../../assets/icons/types/water.svg?react";
import GrassIcon from "../../assets/icons/types/grass.svg?react";
import ElectricIcon from "../../assets/icons/types/electric.svg?react";
import IceIcon from "../../assets/icons/types/ice.svg?react";
import FightingIcon from "../../assets/icons/types/fighting.svg?react";
import PoisonIcon from "../../assets/icons/types/poison.svg?react";
import GroundIcon from "../../assets/icons/types/ground.svg?react";
import FlyingIcon from "../../assets/icons/types/flying.svg?react";
import PsychicIcon from "../../assets/icons/types/psychic.svg?react";
import BugIcon from "../../assets/icons/types/bug.svg?react";
import RockIcon from "../../assets/icons/types/rock.svg?react";
import GhostIcon from "../../assets/icons/types/ghost.svg?react";
import DragonIcon from "../../assets/icons/types/dragon.svg?react";
import DarkIcon from "../../assets/icons/types/dark.svg?react";
import SteelIcon from "../../assets/icons/types/steel.svg?react";
import FairyIcon from "../../assets/icons/types/fairy.svg?react";

type IconMap = {
  [key: string]: React.FC<SVGProps<SVGSVGElement>>;
};

const iconMap: IconMap = {
  normal: NormalIcon,
  fire: FireIcon,
  water: WaterIcon,
  grass: GrassIcon,
  electric: ElectricIcon,
  ice: IceIcon,
  fighting: FightingIcon,
  poison: PoisonIcon,
  ground: GroundIcon,
  flying: FlyingIcon,
  psychic: PsychicIcon,
  bug: BugIcon,
  rock: RockIcon,
  ghost: GhostIcon,
  dragon: DragonIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  fairy: FairyIcon,
};

interface PokemonTypeIconProps {
  typeName: string;
}

export const PokemonTypeIcon = ({ typeName }: PokemonTypeIconProps) => {
  const IconComponent = iconMap[typeName];
  console.log(IconComponent);

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={styles.icon} />;
};
