import "./sidebar.css";

import { useEffect } from "react";

import useUser from "../../store/user";
import useTopic from "../../store/topic";

const Sidebar = () => {
  const fetchUsers = useUser.use.fetchUsers();
  const setUser = useUser.use.setUser();
  const fetchSession = useUser.use.fetchSession();

  const usersArr = useUser.use.users();
  const currentUser = useUser.use.user();
  const currentTopic = useTopic.use.filter();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser && currentTopic) fetchSession(currentUser?.id, currentTopic?.id);
  }, [currentUser?.id, currentTopic?.id]);

  const onSelectUser = (userId: number) => {
    if (userId && currentUser?.id !== userId) setUser(userId);
  };

  return (
    <div className="wrapper-sidebar">
      {usersArr &&
        usersArr.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={
              currentUser && user.id === currentUser.id ? "active" : ""
            }
          >
            <span>{user.name.split("")[0]}</span>
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
