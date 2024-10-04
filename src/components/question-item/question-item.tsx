import { useState } from "react";

import { SessionRecord } from "../../types";

import styles from "./question-item.module.css";

interface QuestionItemProps {
  question: SessionRecord;
  idx: number;
}

const QuestionItem = ({ question, idx }: QuestionItemProps) => {
  const [onShowInput, setOnShowInput] = useState(false);

  const handleShowInput = () => {
    setOnShowInput(!onShowInput);
  };

  return (
    <li>
      <p>{`${idx + 1}.`}</p>
      {onShowInput && (
        <textarea
          defaultValue={question.text}
          onBlur={handleShowInput}
          autoFocus
          className={styles.textarea}
        />
      )}
      {!onShowInput && (
        <p onClick={handleShowInput} className={styles.text}>
          {question.text}
        </p>
      )}
    </li>
  );
};

export default QuestionItem;
