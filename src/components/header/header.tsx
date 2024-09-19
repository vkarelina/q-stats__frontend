import "./header.css";

import { useEffect, useRef } from "react";

import { mockTopics } from "../../mock-data";
import useTopic from "../../store/topic";

const Header = () => {
  const refCurrentElement = useRef<string | null>(null);

  const setFilter = useTopic.use.setFilter();
  const setTopics = useTopic.use.setTopics();

  const topics = useTopic.use.topics();
  const filter = useTopic.use.filter();

  useEffect(() => {
    setTopics(mockTopics);
  }, []);

  const onTabCLick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (
      target instanceof HTMLElement &&
      target.dataset.tab &&
      filter !== target.innerText
    ) {
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
