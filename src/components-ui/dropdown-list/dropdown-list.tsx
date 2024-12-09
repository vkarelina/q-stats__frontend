import cn from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './dropdown-list.module.css';

interface DropdownListItem {
  id: number;
  label: string;
}

interface DropdownListProps<T extends DropdownListItem> {
  children: ReactNode;
  options: T[];
  getItem: (itemId: number) => void;
  renderItem: (item: T) => ReactNode;
}

const DropdownList = <T extends DropdownListItem>({
  children,
  options,
  getItem,
  renderItem,
}: DropdownListProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setIsOpen(!isOpen);
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
        {options.map((option) => (
          <li key={option.id} onClick={() => getItem(option.id)}>
            {renderItem(option)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
