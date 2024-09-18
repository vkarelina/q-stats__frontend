import "./header.css";

import { useEffect, useRef } from "react";

import { mockTopics } from "../../mock-data";
import useFilter from "../../store/filter";

const Header = () => {
  const refCurrentElement = useRef<string | null>(null);

  const setFilter = useFilter((state) => state.setFilter);
  const setTopics = useFilter((state) => state.setTopics);

  const topics = useFilter.use.topics();
  const filter = useFilter.use.filter();

  useEffect(() => {
    setTopics(mockTopics);
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
      {topics?.map((topic, index) => (
        <div key={index} data-tab="true">
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
