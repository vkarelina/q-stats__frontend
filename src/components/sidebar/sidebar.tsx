import { useEffect } from 'react';

import useUser from '../../store/user';

import styles from './sidebar.module.css';

const Sidebar = () => {
  const fetchUsers = useUser.use.fetchUsers();
  const setUser = useUser.use.setUser();

  const users = useUser.use.users();
  const currentUser = useUser.use.user();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (userId: number) => {
    if (currentUser?.id === userId) return;
    setUser(userId);
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
