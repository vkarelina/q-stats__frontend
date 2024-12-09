import { useCallback, useEffect } from 'react';

import { AnswersTable } from '../components/answers-table';
import { Header } from '../components-ui/header';
import { Sidebar } from '../components-ui/sidebar';
import useAnswers from '../store/answers';
import useQuestion from '../store/question';
import useTopic from '../store/topic';
import useUser from '../store/user';

import styles from './main-page.module.css';

const MainPage = () => {
  const getQuestions = useQuestion.use.getQuestions();
  const fetchTopics = useTopic.use.fetchTopics();
  const fetchTopic = useTopic.use.fetchTopic();
  const fetchUser = useUser.use.fetchUser();
  const fetchUsers = useUser.use.fetchUsers();
  const fetchAnswers = useAnswers.use.fetchAnswers();

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
    if (user?.id && topic?.id) getQuestions(topic.id, user.id);
    else if (topic?.id) getQuestions(topic.id);
  }, [getQuestions, topic?.id, user?.id]);

  useEffect(() => {
    refreshQuestions();
    fetchAnswers(user ?? undefined, topic ?? undefined);
  }, [refreshQuestions, fetchAnswers, user, topic]);

  return (
    <div className={styles.wrapperApp}>
      <Header
        items={topics}
        selectedItem={topic}
        handleGetSelectedItem={handleGetSelectedTopic}
      />
      <div className={styles.wrapperContent}>
        <Sidebar
          items={users}
          selectedItem={user}
          handleSelectedItem={handleSelectedUser}
        />
        <AnswersTable refreshQuestions={refreshQuestions}/>
      </div>
    </div>
  );
};

export default MainPage;
