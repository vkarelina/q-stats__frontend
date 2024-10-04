import { useEffect } from "react";

import useTopic from "../../store/topic";

import styles from "./header.module.css";

const Header = () => {
  const fetchTopic = useTopic.use.fetchTopic();
  const fetchTopics = useTopic.use.fetchTopics();

  const topics = useTopic.use.topics();
  const currentTopic = useTopic.use.topic();

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTabClick = ({ target }: React.MouseEvent<HTMLElement>) => {
    if (
      !(target instanceof HTMLElement) ||
      currentTopic?.name === target.innerText
    )
      return;

    const topic = topics?.find((topic) => topic.name === target.innerText);

    if (topic) fetchTopic(topic);
  };

  return (
    <div className={styles.container}>
      {topics?.map((topic, index) => (
        <div
          key={index}
          onClick={handleTabClick}
          className={currentTopic?.id === topic.id ? styles.active : ""}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
