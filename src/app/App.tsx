import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import styles from "./App.module.scss";
// TODO import TypeResultPage from '../pages/TypeResultPage';
// TODO import PokemonDetailPage from '../pages/PokemonDetailPage';

function App() {
  return (
    <main className={styles.appContainer}>
      <h1>PokéDex Pro</h1>

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* TODO rotas futuras: */}
        {/* <Route path="/tipo/:typeName" element={<TypeResultPage />} /> */}
        {/* <Route path="/pokemon/:nameOrId" element={<PokemonDetailPage />} /> */}
      </Routes>
    </main>
  );
}

export default App;
