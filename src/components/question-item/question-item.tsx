import "./question-item.css";

import { useEffect, useState } from "react";

import useUser from "../../store/user";
import { Questions, User } from "../../types";
import CheckIcon from "../check-icon/check-icon";
import CrossIcon from "../cross-icon/cross-icon";

interface QuestionItemProps {
  question: Questions;
  idx: number;
  filter: string;
  user: User;
}

const QuestionItem = ({ question, idx, filter, user }: QuestionItemProps) => {
  // const textareaIsOpen = useRef(null);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isCheckHovered, setIsCheckHovered] = useState(false);
  const [isCrossHovered, setIsCrossHovered] = useState(false);
  const [onShowInput, setOnShowInput] = useState(false);

  const setUpdateAnswer = useUser.use.setUpdateAnswer();

  useEffect(() => {
    if (question.answer !== undefined) {
      setSelectedAnswer(question.answer);
    }
  }, [question.answer]);

  const showInput = () => {
    setOnShowInput(true);
  };

  const hideInput = () => {
    setOnShowInput(false);
  };

  const checkAnswer = (answer: boolean) => {
    const userId = user.id;
    const topicIdx = user.topics.findIndex((topic) => topic.name === filter);

    setUpdateAnswer(userId, topicIdx, idx, answer);
    setSelectedAnswer(answer);
  };

  return (
    <li>
      <p>{idx + 1 + "."}</p>
      {onShowInput && <textarea defaultValue={question.text} onBlur={hideInput} autoFocus />}
      {!onShowInput && <p onClick={showInput}>{question.text}</p>}
      <div>
        <p>12.09.2024</p>
        <div className="icons-container">
          <div
            onMouseEnter={() => setIsCheckHovered(true)}
            onMouseLeave={() => setIsCheckHovered(false)}
            onClick={() => checkAnswer(true)}
          >
            <CheckIcon
              isHovered={isCheckHovered || selectedAnswer === true}
              uniqueId={`check-${idx}`}
            />
          </div>
          <div
            onMouseEnter={() => setIsCrossHovered(true)}
            onMouseLeave={() => setIsCrossHovered(false)}
            onClick={() => checkAnswer(false)}
          >
            <CrossIcon
              isHovered={isCrossHovered || selectedAnswer === false}
              uniqueId={`cross-${idx}`}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default QuestionItem;
