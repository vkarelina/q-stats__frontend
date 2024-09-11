import "./Header.css";

import { useEffect, useRef } from "react";

import { useTabStore } from "../../store";
import { themesMock } from "../../mockdata";

const Header = () => {
  const refCurrentElement = useRef<string | null>(null);
  
  const setFilter = useTabStore((state) => state.setFilter);
  const setTheme = useTabStore((state) => state.setTheme);
  const themes = useTabStore((state) => state.themes);

  useEffect(() => {
    setTheme(themesMock);
  },[])

  const onTabCLick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (target instanceof HTMLElement && target.dataset.tab) {
      refCurrentElement.current = target.innerText;
      setFilter(refCurrentElement.current);
    }
  };

  return (
    <div className="wrapper-header" onClick={onTabCLick}>
      { themes && themes.map((theme, index) => (
        <div key={index} data-tab="true">
          {theme}
        </div>
      ))}
    </div>
  );
};

export default Header;
