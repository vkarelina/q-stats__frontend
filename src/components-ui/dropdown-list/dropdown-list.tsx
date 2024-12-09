import cn from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';

import useQuestion from '../../store/question';
import { ActionType, Question, Topic } from '../../types';

import styles from './dropdown-list.module.css';

interface DropdownListItem {
  id: number;
  label: ActionType;
}

interface DropdownListProps<T extends DropdownListItem> {
  children: ReactNode;
  items: T[];
  question: Question;
  topic: Topic;
  renderItem: (item: T) => ReactNode;
}

const DropdownList = <T extends DropdownListItem>({
  children,
  items,
  question,
  topic,
  renderItem,
}: DropdownListProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const deleteQuestion = useQuestion.use.fetchDeleteQuestion();

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

  const handleActionBarItemClick = (item: T) => {
    switch (item.label) {
      case ActionType.delete:
        deleteQuestion(topic.id, question.id);
        break;
      default:
        setIsOpen(false);
    }
  };

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button className={styles.menuButton} onClick={openMenu}>
        {children}
      </button>
      <ul className={cn(styles.dropdownMenu, { [styles.show]: isOpen })}>
        {items.map((item) => (
          <li key={item.id} onClick={() => handleActionBarItemClick(item)}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
