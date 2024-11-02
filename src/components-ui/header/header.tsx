import cn from 'classnames';

import { Topic } from '../../types';

import styles from './header.module.css';

interface HeaderProps {
  items: Topic[];
  selectedItem: Topic | null;
  handleGetSelectedItem: (topicId: number) => void;
}

const Header = ({ items, selectedItem, handleGetSelectedItem }: HeaderProps) => {
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
            [styles.active]: selectedItem?.id === items.id,
          })}
        >
          {items.name}
        </div>
      ))}
    </div>
  );
};

export default Header;
