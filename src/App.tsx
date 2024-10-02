import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { MainPage } from "./pages";

import styles from "./App.module.css";

const App = () => (
  <div className={styles.wrapperApp}>
    <Header />
    <div className={styles.wrapperContent}>
      <Sidebar />
      <MainPage />
    </div>
  </div>
);

export default App;
