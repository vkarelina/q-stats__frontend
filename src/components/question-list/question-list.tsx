import "./question-list.css";

import QuestionItem from "../question-item/question-item";
import useUser from "../../store/user";

const QuestionList = () => {
  const questions = useUser.use.sessia();
  return (
    <>
      <ul className="wrapper-list">
        <li className="data-question"></li>
        {questions?.map((question, idx) => (
          <QuestionItem question={question} key={question.id} idx={idx} />
        ))}
        <li>
          <p>+</p>
        </li>
      </ul>
    </>
  );
};

export default QuestionList;
