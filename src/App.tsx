import "./App.css";

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { MainPage } from "./pages";

function App() {
  return (
    <>
      <div className="wrapper-app">
        <Header />
        <div className="wrapper-content">
          <Sidebar />
          <MainPage />
        </div>
      </div>
    </>
  );
}

export default App;
