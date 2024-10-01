import "./question-item.css";

import { useState } from "react";

import { SessionRecord } from "../../types";

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
      <p>{idx + 1 + "."}</p>
      {onShowInput && (
        <textarea defaultValue={question.text} onBlur={handleShowInput} autoFocus />
      )}
      {!onShowInput && (
        <p onClick={handleShowInput} className="question-text">
          {question.text}
        </p>
      )}
    </li>
  );
};

export default QuestionItem;
