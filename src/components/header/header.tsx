import { useEffect } from 'react';

import useQuestion from '../../store/question';
import useTopic from '../../store/topic';

import styles from './header.module.css';

const Header = () => {
  const fetchTopics = useTopic.use.fetchTopics();
  const fetchTopic = useTopic.use.fetchTopic();
  const fetchQuestionByTopic = useQuestion.use.fetchQuestionByTopic();

  const topics = useTopic.use.topics();
  const currentTopic = useTopic.use.topic();
  console.log(topics)

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTabClick = (topicName: string, topicId: number) => {
    console.log(topicName)
    console.log(currentTopic?.name)
    if (currentTopic?.name === topicName) return;

    const topic = topics?.find((topic) => topic.name === topicName);

    if (!topic) return;
    fetchQuestionByTopic(topicId);
    fetchTopic(topic);
  };

  return (
    <div className={styles.container}>
      {topics?.map((topic, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(topic.name, topic.id)}
          className={currentTopic?.id === topic.id ? styles.active : ''}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
