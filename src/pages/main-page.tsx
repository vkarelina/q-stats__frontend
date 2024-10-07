import { QuestionList } from "../components/question-list";

import styles from "./main-page.module.css";

const MainPage = () => (
  <div className={styles.container}>
    <QuestionList />
  </div>
);

export default MainPage;
