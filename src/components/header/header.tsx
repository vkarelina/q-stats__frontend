import "./header.css";

import { useEffect } from "react";

import useTopic from "../../store/topic";

const Header = () => {
  const setFilter = useTopic.use.setFilter();
  const fetchTopics = useTopic.use.fetchTopics();

  const topicsArr = useTopic.use.topics();
  const filter = useTopic.use.filter();

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTabCLick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (target instanceof HTMLElement && filter?.name !== target.innerText) {
      const currentTopic = topicsArr?.find(
        (topic) => topic.name === target.innerText
      );

      if (currentTopic) setFilter(currentTopic);
    }
  };

  return (
    <div className="wrapper-header">
      {topicsArr?.map((topic, index) => (
        <div
          key={index}
          onClick={handleTabCLick}
          className={filter?.id === topic.id ? "active" : ""}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
