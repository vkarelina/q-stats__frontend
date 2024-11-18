import { memo, useCallback, useEffect } from 'react';

import { AnswersTable } from '../components/answers-table';
import { QuestionList } from '../components/question-list';
import { Header as HeaderMemo } from '../components-ui/header';
import { Sidebar as SidebarMemo } from '../components-ui/sidebar';
import useQuestion from '../store/question';
import useTopic from '../store/topic';
import useUser from '../store/user';

import styles from './main-page.module.css';

const Header = memo(HeaderMemo);
const Sidebar = memo(SidebarMemo);

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
        <div className={styles.container}>
          <QuestionList
            questions={questions}
            refreshQuestions={refreshQuestions}
          />
          {topic && user && (
            <AnswersTable refreshQuestions={refreshQuestions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
