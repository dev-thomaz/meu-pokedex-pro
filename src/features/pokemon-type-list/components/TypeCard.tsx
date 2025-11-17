import { Link } from "react-router-dom";
import type { ApiResource } from "../../../shared/types/pokemonTypes";
import { PokemonTypeIcon } from "../../../shared/components";
import styles from "./TypeCard.module.scss";

interface TypeCardProps {
  type: ApiResource;
}

export const TypeCard = ({ type }: TypeCardProps) => {
  const cardClassName = `${styles.card} ${styles[type.name]}`;

  return (
    <Link to={`/tipo/${type.name}`} className={cardClassName}>
      <PokemonTypeIcon typeName={type.name} />

      <span>{type.name}</span>
    </Link>
  );
};
