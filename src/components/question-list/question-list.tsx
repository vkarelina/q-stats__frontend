import useTopic from "../../store/topic";
import useUser from "../../store/user";
import "./question-list.css";
import QuestionItem from "../question-item/question-item";

const QuestionList = () => {
  const user = useUser.use.user();
  const filter = useTopic.use.filter();

  const theme = user?.topics.find((topic) => topic.name === filter);

  if (theme) {
    return (
      <ul className="wrapper-list">
        {theme.questions.map((question, idx) => (
          <QuestionItem question={question} idx={idx} key={idx} />
        ))}
        <li className="moreQuestion">
          <p>+</p>
        </li>
      </ul>
    );
  }
};

export default QuestionList;
