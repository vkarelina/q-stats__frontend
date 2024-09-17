import "./header.css";

import { useEffect, useRef } from "react";

import { themesMock } from "../../mockdata";
import useRootStore from "../../store";

const Header = () => {
  const refCurrentElement = useRef<string | null>(null);

  const tabStore = useRootStore((state) => state.tabStore);

  const setFilter = tabStore((state) => state.setFilter);
  const setTheme = tabStore((state) => state.setTheme);

  const themes = tabStore.use.themes();
  const filter = tabStore.use.filter();

  useEffect(() => {
    setTheme(themesMock);
  }, []);

  const onTabCLick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (target instanceof HTMLElement && target.dataset.tab) {
      if (filter === target.innerText) return;
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
