import { AppRoutes } from "./AppRoutes";
import PokeballWallpaper from "../shared/assets/Pokeball-wallpaper.jpg";
import styles from "./App.module.scss";
import AppHeader from "../shared/components/AppHeader/AppHeader";

function App() {
  return (
    <div
      className={styles.appBackgroundWrapper}
      style={{
        backgroundImage: `url(${PokeballWallpaper})`,
      }}
    >
      <main className={styles.appContentContainer}>
        <AppHeader />

        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
