import "./question-list.css";

import { useRef, useState } from "react";

import useUser from "../../store/user";
import useQuestion from "../../store/question";
import useAnswer from "../../store/answers";
import QuestionItem from "../question-item/question-item";

const QuestionList = () => {
  const [openForm, setOpenForm] = useState(false);
  const textQuestion = useRef<string>("");

  const fetchAddQuestion = useQuestion.use.fetchAddQuestion();
  const fetchAddAnswer = useAnswer.use.fetchAddAnswer();
  const fetchSession = useUser.use.fetchSession();

  const questions = useUser.use.sessia();
  const userId = useUser.use.user()?.id;

  const handleChangeTextQuestion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    textQuestion.current = e.target.value;
  };

  const handleQuestion = () => {
    if (!questions || !userId) return;
    const questionData = {
      id: Date.now(),
      topicId: questions[0].topicId,
      text: textQuestion.current,
      isDefault: false,
    };

    fetchAddQuestion(questionData);
    fetchAddAnswer(userId, questionData.id);
    fetchSession(userId, questionData.topicId);
    setOpenForm(false);
    textQuestion.current = "";
  };

  if (questions) {
    return (
      <>
        <ul className="wrapper-list">
          <li className="data-question"></li>
          {questions.map((question, idx) => (
            <QuestionItem question={question} key={question.id} idx={idx} />
          ))}
          {openForm && (
            <li>
              <p>{questions.length + 1}</p>
              <textarea
                defaultValue={textQuestion.current}
                onChange={handleChangeTextQuestion}
                onBlur={handleQuestion}
                autoFocus
              />
            </li>
          )}
          <li onClick={() => setOpenForm(true)}>
            <p>+</p>
          </li>
        </ul>
      </>
    );
  }
};

export default QuestionList;
