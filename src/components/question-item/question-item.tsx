import { useRef, useState } from 'react';

import { Question, SessionRecord } from '../../types';

import styles from './question-item.module.css';

interface QuestionItemProps {
  question: SessionRecord;
  idx: number;
  handleUpdateQuestion: (text: string, question: Question) => void;
}

const QuestionItem = ({
  question,
  idx,
  handleUpdateQuestion,
}: QuestionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleSaveQuestion = (currentQuestion: Question) => {
    if (
      !textAreaRef.current ||
      currentQuestion.text === textAreaRef.current.value
    )
      return;

    handleUpdateQuestion(textAreaRef.current.value, currentQuestion);
  };

  const handleBlur = () => {
    handleSaveQuestion(question);
    toggleEditing();
  };

  return (
    <li>
      <p>{`${idx + 1}.`}</p>
      {isEditing ? (
        <textarea
          defaultValue={question.text}
          onBlur={handleBlur}
          autoFocus
          className={styles.textarea}
          ref={textAreaRef}
        />
      ) : (
        <p onClick={toggleEditing} className={styles.text}>
          {question.text}
        </p>
      )}
    </li>
  );
};

export default QuestionItem;
