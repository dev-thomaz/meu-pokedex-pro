import { useParams } from "react-router-dom";
import { PokemonListByType } from "../features/pokemon-list-by-type";

const TypeResultPage = () => {
  const { typeName } = useParams<{ typeName: string }>();

  if (!typeName) {
    return <div>Tipo não encontrado.</div>;
  }

  return (
    <div>
      <h2>Pokémon do Tipo: {typeName.toUpperCase()}</h2>
      <PokemonListByType typeName={typeName} />
    </div>
  );
};

export default TypeResultPage;
