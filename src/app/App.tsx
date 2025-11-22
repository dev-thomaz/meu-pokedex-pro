import { AppRoutes } from "./AppRoutes";
import PokeballWallpaper from "../shared/assets/Pokeball-wallpaper.jpg";
import styles from "./App.module.scss";

function App() {
  return (
    <div
      className={styles.appBackgroundWrapper}
      style={{
        backgroundImage: `url(${PokeballWallpaper})`,
      }}
    >
      <main className={styles.appContentContainer}>
        <h1>PokéDex Pro</h1>

        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
