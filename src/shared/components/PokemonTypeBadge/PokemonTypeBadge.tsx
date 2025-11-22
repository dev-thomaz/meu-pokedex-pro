import React from "react";
import styles from "./PokemonTypeBadge.module.scss";
import { PokemonTypeIcon } from "../";
import { CARD_END_COLORS } from "../../utils/styleUtils";

interface PokemonTypeBadgeProps {
  typeName: string;
  layout?: "vertical" | "horizontal";
  showIcon?: boolean;
}

export const PokemonTypeBadge: React.FC<PokemonTypeBadgeProps> = ({
  typeName,
  layout = "horizontal",
  showIcon = true,
}) => {
  const backgroundColor = CARD_END_COLORS[typeName.toLowerCase()] || "#ccc";

  const containerStyle =
    layout === "horizontal" ? { backgroundColor, color: "white" } : undefined;

  const labelStyle =
    layout === "vertical" ? { backgroundColor, color: "white" } : undefined;

  return (
    <div
      className={`${styles.container} ${styles[layout]}`}
      style={containerStyle}
    >
      {showIcon && <PokemonTypeIcon typeName={typeName} />}
      <span className={styles.label} style={labelStyle}>
        {typeName}
      </span>
    </div>
  );
};
