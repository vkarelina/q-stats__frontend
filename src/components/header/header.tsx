import { useEffect } from 'react';

import useQuestion from '../../store/question';
import useTopic from '../../store/topic';

import styles from './header.module.css';

const Header = () => {
  const fetchTopics = useTopic.use.fetchTopics();
  const fetchCurrentTopic = useTopic.use.fetchCurrentTopic();
  const fetchQuestions = useQuestion.use.fetchQuestions();

  const topics = useTopic.use.topics();
  const currentTopic = useTopic.use.topic();

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTabClick = (topicName: string) => {
    if (currentTopic?.name === topicName) return;

    const topic = topics?.find((topic) => topic.name === topicName);

    if (!topic) return;
    fetchQuestions();
    fetchCurrentTopic(topic);
  };

  return (
    <div className={styles.container}>
      {topics?.map((topic, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(topic.name)}
          className={currentTopic?.id === topic.id ? styles.active : ''}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
