import React from "react";
import { useGlobalSettingsStore } from "../../shared/store/useGlobalSettingsStore";
import styles from "./SpriteToggle.module.scss";
import pokeballIcon from "../../shared/assets/pokeball.png";

const SpriteToggle: React.FC = () => {
  const { spriteMode, toggleSpriteMode } = useGlobalSettingsStore();

  const isShiny = spriteMode === "shiny";

  return (
    <div className={styles.toggleContainer}>
      <span className={styles.label}>Normal</span>
      <div
        className={`${styles.switch} ${isShiny ? styles.switchShiny : ""}`}
        onClick={toggleSpriteMode}
      >
        <div className={styles.slider}>
          <img src={pokeballIcon} alt="Pokébola" className={styles.pokeball} />
        </div>
      </div>
      <span className={styles.label}>Shiny</span>
    </div>
  );
};

export default SpriteToggle;
