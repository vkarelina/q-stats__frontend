import { SessionRecord } from "../../types";
import "./question-item.css";

import { useState } from "react";

interface QuestionItemProps {
  question: SessionRecord;
  idx: number;
}

const QuestionItem = ({ question, idx }: QuestionItemProps) => {
  const [onShowInput, setOnShowInput] = useState(false);

  const showInput = () => {
    setOnShowInput(true);
  };

  const hideInput = () => {
    setOnShowInput(false);
  };

  return (
    <li>
      <p>{idx + 1 + "."}</p>
      {onShowInput && (
        <textarea defaultValue={question.text} onBlur={hideInput} autoFocus />
      )}
      {!onShowInput && (
        <p onClick={showInput} className="question-text">
          {question.text}
        </p>
      )}
    </li>
  );
};

export default QuestionItem;
