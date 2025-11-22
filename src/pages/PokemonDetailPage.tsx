import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { usePokemonDetailStore } from "../features/pokemon-detail/store/usePokemonDetailStore";
import { useGlobalSettingsStore } from "../shared/store/useGlobalSettingsStore";
import { PokemonTypeBadge } from "../shared/components/PokemonTypeBadge/PokemonTypeBadge";
import { useTextToSpeech } from "../shared/hooks/useTextToSpeech";
import styles from "./PokemonDetailPage.module.scss";
import { getCardBackground } from "../shared/utils/styleUtils";
import type { ProcessedEvolution } from "../shared/types/pokemonTypes";

const EvolutionSpoke = ({
  child,
  currentId,
  getImg,
}: {
  child: ProcessedEvolution;
  currentId: number;
  getImg: (id: number) => string;
}) => (
  <div className={styles.evolutionSpoke}>
    <div className={styles.evolutionCondition}>
      <span className={styles.arrow}>&rarr;</span>
      {child.condition && (
        <span className={styles.conditionText}>{child.condition}</span>
      )}
    </div>

    <EvolutionNodeView node={child} currentId={currentId} getImg={getImg} />
  </div>
);

const EvolutionNodeView = ({
  node,
  currentId,
  getImg,
}: {
  node: ProcessedEvolution;
  currentId: number;
  getImg: (id: number) => string;
}) => {
  const EvolutionCard = (
    <Link to={`/pokemon/${node.id}`} className={styles.evolutionLink}>
      <div
        className={`${styles.evolutionImageWrapper} ${
          currentId === node.id ? styles.isCurrent : ""
        }`}
      >
        <img src={getImg(node.id)} alt={node.name} />
      </div>
      <span className={styles.evolutionName}>{node.name}</span>
    </Link>
  );

  if (!node.evolvesTo || node.evolvesTo.length === 0) {
    return EvolutionCard;
  }

  const isHub = node.evolvesTo.length > 2;

  return (
    <div className={styles.evolutionStages}>
      {EvolutionCard}

      <div className={`${styles.evolutionSpokes} ${isHub ? styles.isHub : ""}`}>
        {node.evolvesTo.map((child) => (
          <EvolutionSpoke
            key={child.id}
            child={child}
            currentId={currentId}
            getImg={getImg}
          />
        ))}
      </div>
    </div>
  );
};

const PokemonDetailPage = () => {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const { pokemon, loading, error, fetchDetail, clearDetail } =
    usePokemonDetailStore();
  const { spriteMode } = useGlobalSettingsStore();

  const { speak, stop, isSpeaking } = useTextToSpeech();

  const [triggerAnim, setTriggerAnim] = useState(false);
  const prevModeRef = useRef(spriteMode);

  useEffect(() => {
    if (prevModeRef.current === "normal" && spriteMode === "shiny") {
      const startTimer = setTimeout(() => setTriggerAnim(true), 10);
      const endTimer = setTimeout(() => setTriggerAnim(false), 1300);
      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
      };
    }
    prevModeRef.current = spriteMode;
  }, [spriteMode]);

  useEffect(() => {
    if (nameOrId) {
      fetchDetail(nameOrId);
    }
    return () => {
      clearDetail();
      stop();
    };
  }, [nameOrId, fetchDetail, clearDetail, stop]);

  const handleSpeakClick = () => {
    if (isSpeaking) {
      stop();
    } else if (pokemon?.flavorText) {
      speak(pokemon.flavorText);
    }
  };

  const getEvolutionImage = (id: number) => {
    if (spriteMode === "shiny") {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

  if (loading)
    return (
      <div
        className={styles.pageContainer}
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        Carregando...
      </div>
    );
  if (error)
    return (
      <div
        className={styles.pageContainer}
        style={{ color: "red", textAlign: "center" }}
      >
        {error}
      </div>
    );
  if (!pokemon) return null;

  const currentImage =
    spriteMode === "shiny" ? pokemon.imageUrlShiny : pokemon.imageUrlNormal;
  const formatLocationName = (slug: string) =>
    slug.replace(/-/g, " ").replace(/area/g, "").trim();

  const typeNames = pokemon.types.map((t) => t.type.name);
  const backgroundGradient = getCardBackground(typeNames);

  const pageStyle = {
    "--type-gradient": backgroundGradient,
  } as React.CSSProperties;

  return (
    <div className={styles.pageContainer} style={pageStyle}>
      <div className={styles.scrollableContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <div
              className={`${styles.imageWrapper} ${
                triggerAnim ? styles.triggerShine : ""
              }`}
            >
              <img
                src={currentImage}
                alt={pokemon.name}
                className={styles.pokemonImage}
              />
              <div className={`${styles.starOrbit} ${styles.orbit1}`}></div>
              <div className={`${styles.starOrbit} ${styles.orbit2}`}></div>
              <div className={`${styles.starOrbit} ${styles.orbit3}`}></div>
            </div>

            <div className={styles.category}>{pokemon.category} POKÉMON</div>
            <h1 className={styles.nameTitle}>
              {pokemon.name}{" "}
              <span className={styles.nameId}>
                #{String(pokemon.id).padStart(3, "0")}
              </span>
            </h1>
            <div className={styles.typesContainer}>
              {pokemon.types.map((t) => (
                <PokemonTypeBadge
                  key={t.type.name}
                  typeName={t.type.name}
                  layout="horizontal"
                />
              ))}
            </div>
          </div>

          <div className={styles.descriptionContainer}>
            <div className={styles.flavorText}>"{pokemon.flavorText}"</div>
            <button
              onClick={handleSpeakClick}
              className={styles.voiceButton}
              data-speaking={isSpeaking ? "true" : "false"}
            >
              {isSpeaking ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-4 0h-2.54l-5 5H2v6h2.54l5 5V3.23zm1.5 6.27c0-1.28-.72-2.4-1.77-3v6.99c1.05-.6 1.77-1.72 1.77-3z" />
                </svg>
              )}
              {isSpeaking ? "Parar Pokédex" : "Ouvir Pokédex"}
            </button>
          </div>

          <div className={styles.infoBlock}>
            <h3>Informações Básicas</h3>
            <div className={styles.basicInfoGrid}>
              <div>
                <div className={styles.infoLabel}>Altura</div>
                <strong>{pokemon.height / 10} m</strong>
              </div>
              <div>
                <div className={styles.infoLabel}>Peso</div>
                <strong>{pokemon.weight / 10} kg</strong>
              </div>
              <div>
                <div className={styles.infoLabel}>Ovos</div>
                <strong style={{ textTransform: "capitalize" }}>
                  {pokemon.eggGroups.join(", ")}
                </strong>
              </div>
            </div>
          </div>

          {pokemon.evolutionChain && (
            <div className={`${styles.infoBlock} ${styles.evolutionSection}`}>
              <h3 style={{ marginBottom: "1.5rem" }}>Linha Evolutiva</h3>

              <div className={styles.evolutionContainer}>
                <EvolutionNodeView
                  node={pokemon.evolutionChain}
                  currentId={pokemon.id}
                  getImg={getEvolutionImage}
                />
              </div>
            </div>
          )}

          <div className={styles.infoBlock}>
            <h3>Voz (Cry)</h3>
            <audio
              controls
              src={pokemon.cries.latest}
              style={{ width: "100%" }}
            >
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </div>

          <div className={styles.infoBlock}>
            <h3>Habilidades</h3>
            <ul className={styles.abilityList}>
              {pokemon.abilities.map((entry) => (
                <li key={entry.ability.name} className={styles.abilityItem}>
                  {entry.ability.name}{" "}
                  {entry.is_hidden && (
                    <span className={styles.hiddenAbility}>
                      (Habilidade Oculta)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.infoBlock}>
            <h3>Onde Encontrar</h3>
            {pokemon.encounters.length === 0 ? (
              <p className={styles.noEncounters}>
                Este Pokémon não pode ser encontrado selvagem ou a localização é
                desconhecida.
              </p>
            ) : (
              <div className={styles.encountersGrid}>
                {pokemon.encounters.map((loc, index) => (
                  <div key={index} className={styles.encounterItem}>
                    <strong className={styles.locationName}>
                      {formatLocationName(loc.location_area.name)}
                    </strong>
                    <div className={styles.versionDetails}>
                      {loc.version_details.map((v) => (
                        <span
                          key={v.version.name}
                          className={styles.versionTag}
                        >
                          {v.version.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.infoBlock}>
            <h3>Aparições em Jogos</h3>
            <div className={styles.gameIndices}>
              {pokemon.gameIndices.map((idx) => (
                <span key={idx.version.name} className={styles.gameTag}>
                  {idx.version.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
