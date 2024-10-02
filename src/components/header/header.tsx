import "./header.css";

import { useEffect } from "react";

import useTopic from "../../store/topic";

const Header = () => {
  const setFilter = useTopic.use.setFilter();
  const fetchTopics = useTopic.use.fetchTopics();

  const topics = useTopic.use.topics();
  const filter = useTopic.use.filter();

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTabClick = (e: React.MouseEvent<HTMLElement>) => {
    const { target } = e;

    if (!(target instanceof HTMLElement) || filter?.name === target.innerText)
      return;

    const currentTopic = topics?.find(topic => topic.name === target.innerText);

    if (currentTopic) setFilter(currentTopic);
  };

  return (
    <div className="wrapper-header">
      {topics?.map((topic, index) => (
        <div
          key={index}
          onClick={handleTabClick}
          className={filter?.id === topic.id ? "active" : ""}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
