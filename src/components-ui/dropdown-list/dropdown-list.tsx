import cn from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './dropdown-list.module.css';

interface DropdownListProps<T extends { id: number }> {
  children: ReactNode;
  items: T[];
  getItemList: (id: number) => void;
  renderItem: (item: T) => ReactNode;
}

const DropdownList = <T extends { id: number }>({
  children,
  items,
  getItemList,
  renderItem,
}: DropdownListProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const getItem = (id: number) => {
    getItemList(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button className={styles.menuButton} onClick={openMenu}>
        {children}
      </button>
      <ul className={cn(styles.dropdownMenu, { [styles.show]: isOpen })}>
        {items.map((item) => (
          <li key={item.id} onClick={() => getItem(item.id)}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
