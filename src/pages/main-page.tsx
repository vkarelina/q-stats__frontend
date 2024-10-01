import "./main-page.css";

import { QuestionList } from "../components/question-list";

const mainPage = () => {
  return (
    <div className="wrapper-main">
      <QuestionList />
    </div>
  );
};

export default mainPage;
