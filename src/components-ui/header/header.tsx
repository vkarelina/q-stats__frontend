import { memo } from 'react';
import classNames from 'classnames';

import useTopic from '../../store/topic';
import { Topic } from '../../types';

import styles from './header.module.css';

interface HeaderProps {
  topics: Topic[];
  handleGetSelectedTopic: (topicId: number) => void;
}

const Header = ({ topics, handleGetSelectedTopic }: HeaderProps) => {
  const currentTopic = useTopic.use.topic();

  const handleTabClick = (topicId: number) => {
    handleGetSelectedTopic(topicId);
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

export default memo(Header);
