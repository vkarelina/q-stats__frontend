import "./question-list.css";

import QuestionItem from "../question-item/question-item";
import useQuestion from "../../store/question";

const QuestionList = () => {
  const currentQuestions = useQuestion.use.currentQuestions();

  if (currentQuestions) {
    return (
      <ul className="wrapper-list">
        <li className="data-question"></li>
        {currentQuestions.map((question, idx) => (
          <QuestionItem question={question} key={question.id} idx={idx} />
        ))}
        <li>
          <p>+</p>
        </li>
      </ul>
    );
  } else {
    return(
      <p>Для отображения вопросов выберите тему и пользователя</p>
    )
  }
};

export default QuestionList;
