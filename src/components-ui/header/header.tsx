import cn from 'classnames';

import { Topic } from '../../types';

import styles from './header.module.css';

interface HeaderProps {
  items: Topic[];
  currentItem: Topic | null;
  handleGetSelectedItem: (topicId: number) => void;
}

const Header = ({ items, currentItem, handleGetSelectedItem }: HeaderProps) => {
  const handleTabClick = (topicId: number) => {
    handleGetSelectedItem(topicId);
  };

  return (
    <div className={styles.container}>
      {items?.map((items, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(items.id)}
          className={cn({
            [styles.active]: currentItem?.id === items.id,
          })}
        >
          {items.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
