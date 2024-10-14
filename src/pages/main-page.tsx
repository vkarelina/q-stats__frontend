import { useState, useEffect } from 'react';

import { QuestionList } from '../components/question-list';
import useQuestion from '../store/question';
import useTopic from '../store/topic';
import useUser from '../store/user';
import { Question, SessionRecord } from '../types';

import styles from './main-page.module.css';

const MainPage = () => {
  const sessionQuestions = useUser.use.session();
  const allQuestions = useQuestion.use.questions();
  const topic = useTopic.use.topic();
  const user = useUser.use.user();

  const fetchSession = useUser.use.fetchSession();
  const fetchClearSession = useUser.use.fetchClearSession();

  const [questions, setQuestions] = useState<Question[] | SessionRecord[]>([]);

  const selectQuestions = () => {
    return sessionQuestions?.length
    ? sessionQuestions
    : allQuestions.filter(
      (question) => question.isDefault && question.topicId === topic?.id,
    );
  };

  useEffect(() => (
    user && topic ? fetchSession(user.id, topic.id) : fetchClearSession()
  ), [user, topic]);

  useEffect(() => {
    setQuestions(selectQuestions());
  }, [sessionQuestions, allQuestions, topic]);

  return (
    <div className={styles.container}>
      <QuestionList questions={questions} />
    </div>
  );
};

export default MainPage;
