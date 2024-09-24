import "./question-list.css";

import useTopic from "../../store/topic";
import useUser from "../../store/user";
import QuestionItem from "../question-item/question-item";

const QuestionList = () => {
  const user = useUser.use.user();
  const filter = useTopic.use.filter();

  const theme = user?.topics.find((topic) => topic.name === filter);

  if (theme) {
    return (
      <ul className="wrapper-list">
        {user && filter && theme.questions.map((question, idx) => (
          <QuestionItem question={question} idx={idx} filter={filter} user={user} key={idx} />
        ))}
        <li className="moreQuestion">
          <p>+</p>
        </li>
      </ul>
    );
  }
};

export default QuestionList;
