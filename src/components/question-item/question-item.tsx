import { SessionRecord } from "../../types";
import CheckIcon from "../check-icon/check-icon";
import CrossIcon from "../cross-icon/cross-icon";
import "./question-item.css";

import { useState } from "react";

interface QuestionItemProps {
  question: SessionRecord;
  idx: number;
}

const QuestionItem = ({ question, idx }: QuestionItemProps) => {
  console.log(question);
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
      {!onShowInput && <p onClick={showInput}>{question.text}</p>}
      {question.answers.map(() => (
        <div className="icon">
          <div>
            <CheckIcon />
          </div>
          <div>
            <CrossIcon />
          </div>
        </div>
      ))}
    </li>
  );
};

export default QuestionItem;
