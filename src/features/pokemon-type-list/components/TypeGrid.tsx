import { useEffect } from "react";
import { useTypeStore } from "../store/useTypeStore";
import { TypeCard } from "./TypeCard";
import styles from "./TypeGrid.module.scss";
// TODO: Vamos criar componentes 'shared' de Loading e Error depois

export const TypeGrid = () => {
  const { types, loading, error, fetchTypes } = useTypeStore();

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  if (loading) {
    // TODO: Substituir por um <LoadingSpinner />
    return <div>Carregando tipos...</div>;
  }

  if (error) {
    // TODO: Substituir por um <ErrorDisplay />
    return <div>{error}</div>;
  }

  return (
    <div className={styles.grid}>
      {types.map((type) => (
        <TypeCard key={type.name} type={type} />
      ))}
    </div>
  );
};
