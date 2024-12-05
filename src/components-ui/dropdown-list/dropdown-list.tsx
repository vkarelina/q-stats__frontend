import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './dropdown-list.module.css';

interface DropdownListProps {
  children: ReactNode;
  items: any[];
  getItemList: (item: any) => void;
}

const DropdownList = ({ children, items, getItemList }: DropdownListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const getItem = (item: any) => {
    getItemList(item)
  }

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
      <ul className={`${styles.dropdownMenu} ${isOpen ? styles.show : ''}`}>
        {items.map((item, idx) => (
          <li key={idx} onClick={() => getItem(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
