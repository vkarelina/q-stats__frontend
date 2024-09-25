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
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isCheckHovered, setIsCheckHovered] = useState(false);
  const [isCrossHovered, setIsCrossHovered] = useState(false);
  const [onShowInput, setOnShowInput] = useState(false);

  const setUpdateAnswer = useUser.use.setUpdateAnswer();

  const lastIndex = question.answers.length - 1;

  useEffect(() => {
    if (question.answers[lastIndex].answer !== undefined) {
      setSelectedAnswer(question.answers[lastIndex].answer);
    }
  }, [question.answers[lastIndex].answer]);

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
      {onShowInput && (
        <textarea defaultValue={question.text} onBlur={hideInput} autoFocus />
      )}
      {!onShowInput && <p onClick={showInput}>{question.text}</p>}
      <div className="icon-container">
        {question.answers.map((answerItem, answerIdx) => (
          <div className="icon" key={answerItem.id}>
            <div
              onMouseEnter={() => setIsCheckHovered(true)}
              onMouseLeave={() => setIsCheckHovered(false)}
              onClick={() => checkAnswer(true)}
            >
              <CheckIcon
                isHovered={isCheckHovered || selectedAnswer || answerItem.answer === true}
                uniqueId={`check-${idx}-${answerIdx}`}
              />
            </div>
            <div
              onMouseEnter={() => setIsCrossHovered(true)}
              onMouseLeave={() => setIsCrossHovered(false)}
              onClick={() => checkAnswer(false)}
            >
              <CrossIcon
                isHovered={isCrossHovered || selectedAnswer || answerItem.answer === false}
                uniqueId={`cross-${idx}-${answerIdx}`}
              />
            </div>
          </div>
        ))}
      </div>
    </li>
  );
};

export default QuestionItem;
