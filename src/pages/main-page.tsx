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

  const [questions, setQuestions] = useState<Question[] | SessionRecord[] | []>([]);

  const selectQuestions = () => {
    if (sessionQuestions && sessionQuestions.length > 0) return sessionQuestions;

    return allQuestions.filter(
      (question) => question.isDefault && question.topicId === topic?.id,
    );
  };

  useEffect(() => {
    if (!user || !topic) return;

    fetchSession(user.id, topic.id);
  }, [user, topic, allQuestions]);

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
