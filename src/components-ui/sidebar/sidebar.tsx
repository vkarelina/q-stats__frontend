import classNames from 'classnames';
import { memo } from 'react';

import useUser from '../../store/user';
import { User } from '../../types';

import styles from './sidebar.module.css';

interface SidebarProps {
  users: User[];
  handleSelectedUser: (userId: number) => void;
}

const Sidebar = ({ users, handleSelectedUser }: SidebarProps) => {
  const currentUser = useUser.use.user();

  const handleSelectUser = (userId: number) => {
    handleSelectedUser(userId);
  };

  return (
    <div className={styles.wrapperSidebar}>
      {users?.map((user) => (
        <div
          key={user.id}
          onClick={() => handleSelectUser(user.id)}
          className={classNames({
            [styles.active]: user?.id === currentUser?.id,
          })}
        >
          <span>{user.name.charAt(0)}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(Sidebar);
