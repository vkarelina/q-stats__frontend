import { useCallback, useEffect } from 'react';

import useQuestion from '../store/question';
import useUser from '../store/user';
import useTopic from '../store/topic';

import { QuestionList } from '../components/question-list';
import { Header } from '../components-ui/header';
import { Sidebar } from '../components-ui/sidebar';

import styles from './main-page.module.css';

const MainPage = () => {
  const fetchQuestions = useQuestion.use.fetchQuestions();
  const fetchTopics = useTopic.use.fetchTopics();
  const fetchTopic = useTopic.use.fetchTopic();
  const fetchUser = useUser.use.fetchUser();
  const fetchUsers = useUser.use.fetchUsers();

  const questions = useQuestion.use.questions();
  const user = useUser.use.user();
  const users = useUser.use.users();
  const topic = useTopic.use.topic();
  const topics = useTopic.use.topics();

  const handleGetSelectedTopic = useCallback((topicId: number) => {
    fetchTopic(topicId);
  }, []);

  const handleSelectedUser = useCallback((userId: number) => {
    fetchUser(userId);
  }, []);

  useEffect(() => {
    fetchTopics();
    fetchUsers();
  }, []);

  const refreshQuestions = useCallback(() => {
    if (user && topic) fetchQuestions(topic.id, user.id);
    else if (topic) fetchQuestions(topic.id);
  }, [fetchQuestions, topic, user]);

  useEffect(() => {
    refreshQuestions();
  }, [refreshQuestions]);

  return (
    <div className={styles.wrapperApp}>
      <Header topics={topics} handleGetSelectedTopic={handleGetSelectedTopic} />
      <div className={styles.wrapperContent}>
        <Sidebar users={users} handleSelectedUser={handleSelectedUser} />
        <div className={styles.container}>
          <QuestionList questions={questions} refreshQuestions={refreshQuestions} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
