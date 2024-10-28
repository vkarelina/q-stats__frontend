import { useEffect } from 'react';
import classNames from 'classnames';

import useTopic from '../../store/topic';

import styles from './header.module.css';
import useQuestion from '../../store/question';

const Header = () => {
  const fetchTopics = useTopic.use.fetchTopics();
  const fetchTopic = useTopic.use.fetchTopic();
  const fetchTopicQuestions = useQuestion.use.fetchTopicQuestions();

  const topics = useTopic.use.topics();
  const currentTopic = useTopic.use.topic();

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTabClick = (id: number) => {
    fetchTopic(id);
    fetchTopicQuestions(id);
  };

  return (
    <div className={styles.container}>
      {topics?.map((topic, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(topic.id)}
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
