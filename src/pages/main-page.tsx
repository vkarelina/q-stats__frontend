import { useState, useEffect } from 'react';

import { QuestionList } from '../components/question-list';
import useQuestion from '../store/question';
import useTopic from '../store/topic';
import { Question } from '../types';

import styles from './main-page.module.css';
import useUser from '../store/user';

const MainPage = () => {
  const fetchUserQuestions = useQuestion.use.fetchUserQuestions();

  const allQuestions = useQuestion.use.questions();
  const topic = useTopic.use.topic();
  const user = useUser.use.user();

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (user) fetchUserQuestions(user.id);
    setQuestions(allQuestions);
  }, [allQuestions, topic]);

  return (
    <div className={styles.container}>
      <QuestionList questions={questions} />
    </div>
  );
};

export default MainPage;
