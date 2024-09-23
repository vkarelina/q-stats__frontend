import { useState } from "react";
import CheckIcon from "../check-icon/check-icon";
import CrossIcon from "../cross-icon/cross-icon";

const QuestionItem = ({ question, idx }) => {
  const [isCheckHovered, setIsCheckHovered] = useState(false);
  const [isCrossHovered, setIsCrossHovered] = useState(false);
  const [onShowInput, setOnShowInput] = useState(false);

  const showInput = () => {
    setOnShowInput(true);
  }

  return (
    <li>
      <p>{idx + 1 + "."}</p>
      { onShowInput && (
          <textarea value={question.text} />
      )}
      { !onShowInput && (
          <p onClick={showInput}>{question.text}</p>
      )}
      <div
        onMouseEnter={() => setIsCheckHovered(true)}
        onMouseLeave={() => setIsCheckHovered(false)}
      >
        <CheckIcon isHovered={isCheckHovered} uniqueId={`check-${idx}`} />
      </div>
      <div
        onMouseEnter={() => setIsCrossHovered(true)}
        onMouseLeave={() => setIsCrossHovered(false)}
      >
        <CrossIcon isHovered={isCrossHovered} uniqueId={`cross-${idx}`} />
      </div>
      <p>12.09.2024</p>
    </li>
  );
};

export default QuestionItem;
