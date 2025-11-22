import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalSettingsStore } from "../../store/useGlobalSettingsStore";
import SpriteToggle from "../../../features/sprite-toggle/SpriteToggle";
import styles from "./AppHeader.module.scss";

import pokeballIcon from "../../assets/pokeball.png";
import pokedex from "../../assets/pokedex.png";

const ALL_GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailPage = location.pathname.includes("/pokemon/");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const setSearchTerm = useGlobalSettingsStore((state) => state.setSearchTerm);
  const setSelectedGenerations = useGlobalSettingsStore(
    (state) => state.setSelectedGenerations
  );
  const searchTerm = useGlobalSettingsStore((state) => state.searchTerm);
  const selectedGenerations = useGlobalSettingsStore(
    (state) => state.selectedGenerations
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenerationChange = (gen: number) => {
    let nextGenerations: number[];

    if (selectedGenerations.includes(gen)) {
      nextGenerations = selectedGenerations.filter((g) => g !== gen);
    } else {
      nextGenerations = [...selectedGenerations, gen];
    }

    if (
      nextGenerations.length === ALL_GENERATIONS.length ||
      nextGenerations.length === 0
    ) {
      setSelectedGenerations([]);
    } else {
      setSelectedGenerations(nextGenerations.sort((a, b) => a - b));
    }
  };

  const isAllSelected = selectedGenerations.length === 0;
  const displayCount = isAllSelected ? "Todas" : selectedGenerations.length;

  return (
    <header className={styles.headerContainer}>
      <img src={pokedex} alt="Pokébola" className={styles.pokedexIcon} />
      <span>Pokédex Pro</span>

      <div className={styles.navSection}>
        <Link to="/" className={styles.navButton}>
          Home
        </Link>

        {isDetailPage && (
          <button onClick={() => navigate(-1)} className={styles.navButton}>
            &larr; Voltar
          </button>
        )}
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Pesquisar por nome ou nº..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.navSection}>
        <div className={styles.generationDropdownWrapper} ref={dropdownRef}>
          <button
            className={`${styles.generationSelectButton} ${
              isDropdownOpen ? styles.isOpen : ""
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Geração ({displayCount})
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button
                onClick={() => setSelectedGenerations([])}
                className={`${styles.dropdownOption} ${
                  isAllSelected ? styles.selectedOption : ""
                }`}
              >
                Selecionar Todas
              </button>

              <div className={styles.separator}></div>

              {ALL_GENERATIONS.map((gen) => (
                <button
                  key={gen}
                  onClick={() => handleGenerationChange(gen)}
                  className={`${styles.dropdownOption} ${
                    selectedGenerations.includes(gen)
                      ? styles.selectedOption
                      : ""
                  }`}
                >
                  Geração {gen}
                  {selectedGenerations.includes(gen) && (
                    <span>
                      <img
                        src={pokeballIcon}
                        alt="Pokébola"
                        className={styles.pokeball}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <SpriteToggle />
      </div>
    </header>
  );
};

export default AppHeader;
