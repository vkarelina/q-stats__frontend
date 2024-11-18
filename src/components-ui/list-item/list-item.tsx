import { useRef, useState } from 'react';

import { Question } from '../../types';

import styles from './list-item.module.css';

interface QuestionItemProps {
  item: Question;
  idx: number;
  handleUpdateItem: (text: string, itemId: number) => void;
}

const ListItem = ({ item, idx, handleUpdateItem }: QuestionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveItem = (currentItem: Question) => {
    if (!textAreaRef.current || currentItem.text === textAreaRef.current.value)
      return;

    handleUpdateItem(textAreaRef.current.value, currentItem.id);
  };

  const handleBlur = () => {
    handleSaveItem(item);
    toggleEditing();
  };

  return (
    <li>
      <p>{`${idx + 1}.`}</p>
      {isEditing ? (
        <textarea
          defaultValue={item.text}
          onBlur={handleBlur}
          autoFocus
          className={styles.textarea}
          ref={textAreaRef}
          
        />
      ) : (
        <p onClick={toggleEditing} className={styles.text}>
          {item.text}
        </p>
      )}
    </li>
  );
};

export default ListItem;
