import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TypeResultPage from "../pages/TypeResultPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tipo/:typeName" element={<TypeResultPage />} />

      <Route
        path="/pokemon/:nameOrId"
        element={<div>Detalhes do Pokémon aqui</div>}
      />
    </Routes>
  );
};
