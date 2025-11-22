import { useEffect } from "react";
import { usePokemonByTypeStore } from "../store/usePokemonByTypeStore";
import type { PokemonListItemDetail } from "../../../shared/types/pokemonTypes";
import styles from "./PokemonListByType.module.scss";
import PokemonCardLink from "../../../shared/components/PokemonCardLink/PokemonCardLink";

interface PokemonListProps {
  typeName: string;
}

const PokemonListByType = ({ typeName }: PokemonListProps) => {
  const { pokemonList, loading, error, fetchList } = usePokemonByTypeStore();

  useEffect(() => {
    fetchList(typeName);
  }, [typeName, fetchList]);

  if (loading) {
    return <div>Carregando {typeName.toUpperCase()} Pokémon...</div>;
  }

  if (error) {
    return <div>Erro ao carregar lista: {error}</div>;
  }

  if (pokemonList.length === 0 && !loading) {
    return <div>Nenhum Pokémon encontrado para este tipo.</div>;
  }

  return (
    <div className={styles.grid}>
      {pokemonList.map((pokemon: PokemonListItemDetail) => (
        <PokemonCardLink key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonListByType;
