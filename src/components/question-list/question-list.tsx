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
        <li className="data-question">
          <div className="data-wrapper">
              {theme.questions[0].answers.map(answer => (
                <p key={answer.id}>{answer.data}</p>
              ))}
          </div>
        </li>
        {user &&
          filter &&
          theme.questions.map((question, idx) => (
            <QuestionItem
              question={question}
              idx={idx}
              filter={filter}
              user={user}
              key={idx}
            />
          ))}
        <li>
          <p>+</p>
        </li>
      </ul>
    );
  }
};

export default QuestionList;
