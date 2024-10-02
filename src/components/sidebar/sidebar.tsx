import "./sidebar.css";

import { useEffect } from "react";

import useUser from "../../store/user";
import useTopic from "../../store/topic";

const Sidebar = () => {
  const fetchUsers = useUser.use.fetchUsers();
  const setUser = useUser.use.setUser();
  const fetchSession = useUser.use.fetchSession();

  const users = useUser.use.users();
  const currentUser = useUser.use.user();
  const currentTopic = useTopic.use.filter();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser && currentTopic)
      fetchSession(currentUser.id, currentTopic.id);
  }, [currentUser?.id, currentTopic?.id]);

  const handleSelectUser = (userId: number) => {
    if (currentUser?.id !== userId) setUser(userId);
  };

  return (
    <div className="wrapper-sidebar">
      {users &&
        users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleSelectUser(user.id)}
            className={
              user.id === currentUser?.id ? "active" : ""
            }
          >
            <span>{user.name.charAt(0)}</span>
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
