import "./header.css";

import { useEffect, useRef } from "react";

import { themesMock } from "../../mockdata";
import useStore from "../../store";

const Header = () => {
  const refCurrentElement = useRef<string | null>(null);

  const setFilter = useStore((state) => state.setFilter);
  const setTheme = useStore((state) => state.setTheme);
  const themes = useStore.use.themes();
  const filter = useStore.use.filter();

  useEffect(() => {
    setTheme(themesMock);
  }, []);

  const onTabCLick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (target instanceof HTMLElement && target.dataset.tab) {
      if (filter?.name === target.innerText) return;
      refCurrentElement.current = target.innerText;
      setFilter(refCurrentElement.current);
    }
  };

  return (
    <div className="wrapper-header" onClick={onTabCLick}>
      {themes &&
        themes.map((theme, index) => (
          <div key={index} data-tab="true">
            {theme.name}
          </div>
        ))}
    </div>
  );
};

export default Header;
