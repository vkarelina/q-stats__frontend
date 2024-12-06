import cn from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './dropdown-list.module.css';

interface DropdownListProps<T> {
  children: ReactNode;
  items: T[];
  getItemList: (item: T, idx: number) => void;
  renderItem: (item: T) => ReactNode;
}

const DropdownList = <T,>({
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

  const closeMenu = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const getItem = (item: T, idx: number) => {
    getItemList(item, idx);
    setIsOpen(false);
  };

  useEffect(() => {
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
        {items.map((item, idx) => (
          <li key={idx} onClick={() => getItem(item, idx + 1)}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
