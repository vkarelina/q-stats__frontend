import { memo, useCallback, useEffect } from 'react';

import { Header as HeaderMemo } from '../components-ui/header';
import { Sidebar as SidebarMemo } from '../components-ui/sidebar';
import useQuestion from '../store/question';
import useTopic from '../store/topic';
import useUser from '../store/user';
import './index.css';

import styles from './main-page.module.css';

import { AnswerContainer } from '../components/answer-container';
import useAnswers from '../store/answers';
import { format } from 'path';
import { formatDate } from '../utils/date';

const Header = memo(HeaderMemo);
const Sidebar = memo(SidebarMemo);

const MainPage = () => {
  const fetchQuestions = useQuestion.use.fetchQuestions();
  const fetchTopics = useTopic.use.fetchTopics();
  const fetchTopic = useTopic.use.fetchTopic();
  const fetchUser = useUser.use.fetchUser();
  const fetchUsers = useUser.use.fetchUsers();
  const fetchAnswers = useAnswers.use.fetchAnswers();

  const questions = useQuestion.use.questions();
  const user = useUser.use.user();
  const users = useUser.use.users();
  const topic = useTopic.use.topic();
  const topics = useTopic.use.topics();
  const answers = useAnswers.use.answers();



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
  }, [fetchQuestions, topic, user, answers]);

  useEffect(() => {
    refreshQuestions();
  }, [refreshQuestions]);

  const sortedAnswers = answers.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateA - dateB;
  });

  useEffect(() => {
    fetchAnswers(user, topic);
  }, [user, topic, fetchAnswers]);

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
        {/* <div className={styles.container}>
          <QuestionList
            questions={questions}
            refreshQuestions={refreshQuestions}
          />
          {topic && user && (
            <AnswersTable refreshQuestions={refreshQuestions}
            />
          )}
        </div> */}
        {topic && user && (
          <div className="container">
            <div className="header">
              <div className="question-header"></div>
              <div style={{ display: 'flex' }}>
                {answers.map((a) => (
                  <div key={a.date} className="answer-header">
                    {a.date}
                  </div>
                ))}
              </div>
            </div>

            {questions.map((q) => (
              <div className="row" key={q.id}>
                <div className="question">{q.text}</div>

                <div className="answers" style={{ display: 'flex' }}>
                  {answers.map((a, index) => {
                    const createdAt = formatDate(a.answers[q.id]?.createdAt ?? new Date())
                    
                    return (
                      <div className="answer" key={`${index}-${q.id}`}>
                        <AnswerContainer
                          key={a.date}
                          date={a.date}
                          index={index}
                          createdAt={new Date(createdAt.split('-').reverse().join('-'))}
                          questionId={q.id}
                          currentStatus={a.answers[q.id]?.response}
                          refreshQuestions={refreshQuestions}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
