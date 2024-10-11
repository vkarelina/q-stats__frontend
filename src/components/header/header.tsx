import classNames from 'classnames';
import { useEffect } from 'react';

import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import { Topic } from '../../types';

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

  const handleTabClick = (topic: Topic) => {
    if (currentTopic?.id === topic.id) return;
    fetchQuestions();
    fetchCurrentTopic(topic);
  };

  return (
    <div className={styles.container}>
      {topics?.map((topic, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(topic)}
          className={classNames({
            [styles.active]: currentTopic?.id === topic.id,
          })}
        >
          {topic.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
