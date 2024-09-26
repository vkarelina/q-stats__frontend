import { useEffect } from "react";
import "./App.css";

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { MainPage } from "./pages";
import { fetchSession } from "./api/api";

function App() {
  useEffect(() => {
    console.log(fetchSession(2, 1));
  });

  return (
    <div className="wrapper-app">
      <Header />
      <div className="wrapper-content">
        <Sidebar />
        <MainPage />
      </div>
    </div>
  );
}

export default App;
