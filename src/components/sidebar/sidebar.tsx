import { useEffect } from 'react';

import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import useUser from '../../store/user';

import styles from './sidebar.module.css';

const Sidebar = () => {
  const fetchUsers = useUser.use.fetchUsers();
  const setUser = useUser.use.setUser();
  const fetchSession = useUser.use.fetchSession();
  const fetchQuestions = useQuestion.use.fetchQuestions();

  const users = useUser.use.users();
  const currentUser = useUser.use.user();
  const topic = useTopic.use.topic();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser && topic) fetchSession(currentUser.id, topic.id);
  }, [currentUser?.id, topic?.id]);

  const handleSelectUser = (userId: number) => {
    if (currentUser?.id === userId) return;
    setUser(userId);
    fetchQuestions(userId, topic?.id ?? 0);
  };

  return (
    <div className={styles.wrapperSidebar}>
      {users?.map((user) => (
        <div
          key={user.id}
          onClick={() => handleSelectUser(user.id)}
          className={user.id === currentUser?.id ? styles.active : ''}
        >
          <span>{user.name.charAt(0)}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
