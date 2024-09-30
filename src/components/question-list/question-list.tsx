import "./question-list.css";

import useUser from "../../store/user";
import useQuestion from "../../store/question";
import useAnswer from "../../store/answers";
import QuestionItem from "../question-item/question-item";

const QuestionList = () => {
  const questions = useUser.use.sessia();
  const userId = useUser.use.user()?.id;

  const fetchAddQuestion = useQuestion.use.fetchAddQuestion();
  const fetchAddAnswer = useAnswer.use.fetchAddAnswer();
  const fetchSession = useUser.use.fetchSession();

  const addQuestion = () => {
    if (!questions || !userId) return;
    const question = {
      id: Date.now(),
      topicId: questions[0].topicId,
      text: "qqq",
      isDefault: false,
    };

    fetchAddQuestion(question);
    fetchAddAnswer(userId, question.id);
    fetchSession(userId, question.topicId);
  };

  if (questions) {
    return (
      <>
        <ul className="wrapper-list">
          <li className="data-question"></li>
          {questions &&
            questions?.map((question, idx) => (
              <QuestionItem question={question} key={question.id} idx={idx} />
            ))}
          <li onClick={addQuestion}>
            <p>+</p>
          </li>
        </ul>
      </>
    );
  }
};

export default QuestionList;
