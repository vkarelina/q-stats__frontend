import cn from 'classnames';

import { User } from '../../types';

import styles from './sidebar.module.css';

interface SidebarProps {
  items: User[];
  selectedItem: User | null;
  handleSelectedItem: (itemId: number) => void;
}

const Sidebar = ({ items, selectedItem, handleSelectedItem }: SidebarProps) => {
  const handleSelectUser = (itemId: number) => {
    handleSelectedItem(itemId);
  };

  return (
    <div className={styles.wrapperSidebar}>
      {items?.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelectUser(item.id)}
          className={cn({
            [styles.active]: item?.id === selectedItem?.id,
          })}
        >
          <span>{item.name.charAt(0)}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
