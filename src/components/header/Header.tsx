import "./Header.css";

import { useRef } from "react";

import { useTabStore } from "../../store";

const themes = ["React", "Nest", "Node js", "TypeScript", "JavaScript"];

const Header = () => {
  const refCurrentElement = useRef<string | null>(null);
  const setFilter = useTabStore((state) => state.setFilter);

  const onTabCLick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.dataset.tab) {
      refCurrentElement.current = target.innerText;
      setFilter(refCurrentElement.current);
    }
  };

  return (
    <div className="wrapper-header" onClick={onTabCLick}>
      {themes.map((theme, index) => (
        <div key={index} data-tab="true">
          {theme}
        </div>
      ))}
    </div>
  );
};

export default Header;
