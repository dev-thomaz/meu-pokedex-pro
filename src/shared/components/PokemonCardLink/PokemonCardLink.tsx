import React from "react";
import { Link } from "react-router-dom";
import type { PokemonListItemDetail } from "../../types/pokemonTypes";
import { getCardBackground, getTextColor } from "../../utils/styleUtils";
import { getSpriteUrl } from "../../utils/imageUtils";
import { useGlobalSettingsStore } from "../../store/useGlobalSettingsStore";
import styles from "./PokemonCardLink.module.scss";

import outlinePokeball from "../../assets/outline-pokeball.png";
import { PokemonTypeBadge } from "../PokemonTypeBadge/PokemonTypeBadge";
interface PokemonCardLinkProps {
  pokemon: PokemonListItemDetail;
}

const PokemonCardLink: React.FC<PokemonCardLinkProps> = ({ pokemon }) => {
  const spriteMode = useGlobalSettingsStore((state) => state.spriteMode);
  const FALLBACK_URL = outlinePokeball;

  const normalUrl = React.useMemo(
    () => getSpriteUrl(pokemon, "normal") || FALLBACK_URL,
    [pokemon, FALLBACK_URL]
  );
  const shinyUrl = React.useMemo(
    () => getSpriteUrl(pokemon, "shiny") || FALLBACK_URL,
    [pokemon, FALLBACK_URL]
  );

  const [currentNormalUrl, setCurrentNormalUrl] = React.useState(normalUrl);
  const [currentShinyUrl, setCurrentShinyUrl] = React.useState(shinyUrl);

  React.useEffect(() => {
    setCurrentNormalUrl(normalUrl);
    setCurrentShinyUrl(shinyUrl);
  }, [normalUrl, shinyUrl]);

  const handleNormalError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (currentNormalUrl !== FALLBACK_URL) {
      e.currentTarget.src = FALLBACK_URL;
      setCurrentNormalUrl(FALLBACK_URL);
    }
  };

  const handleShinyError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (currentShinyUrl !== FALLBACK_URL) {
      e.currentTarget.src = FALLBACK_URL;
      setCurrentShinyUrl(FALLBACK_URL);
    }
  };

  const isShinyMode = spriteMode === "shiny";
  const typeNames = pokemon.types.map((t) => t.type.name);
  const primaryType = typeNames[0];
  const cardBackground = getCardBackground(typeNames);
  const textColor = getTextColor(primaryType);
  const formattedId = pokemon.id.toString().padStart(3, "0");

  const renderCardContent = (isShinyFace: boolean) => (
    <React.Fragment>
      <div className={styles.imageContainer}>
        <img
          src={isShinyFace ? currentShinyUrl : currentNormalUrl}
          alt={pokemon.name}
          loading="lazy"
          className={styles.sprite}
          onError={isShinyFace ? handleShinyError : handleNormalError}
        />
      </div>

      <div className={styles.info}>
        <span className={styles.id}>#{formattedId}</span>
        <h3 className={styles.name}>
          {pokemon.name}{" "}
          {isShinyFace && (
            <span style={{ fontSize: "0.8em", opacity: 0.8 }}>(Shiny)</span>
          )}
        </h3>

        <div className={styles.typeIcons}>
          {typeNames.map((typeName) => (
            <PokemonTypeBadge
              key={typeName}
              typeName={typeName}
              layout="vertical"
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className={`${styles.card} ${isShinyMode ? styles.flipped : ""}`}
      style={{ background: cardBackground, color: textColor }}
    >
      {/* FACE DA FRENTE (NORMAL) */}
      <div className={styles.cardFaceFront}>{renderCardContent(false)}</div>

      {/* FACE DE TRÁS (SHINY) */}
      <div className={styles.cardFaceBack}>{renderCardContent(true)}</div>
    </Link>
  );
};

export default PokemonCardLink;
