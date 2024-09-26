import "./sidebar.css";

import { useEffect } from "react";

import useUser from "../../store/user";
import useQuestion from "../../store/question";
import useTopic from "../../store/topic";

const Sidebar = () => {
  const fetchUsers = useUser.use.fetchUsers();
  const setUser = useUser.use.setUser();
  const fetchQuestions = useQuestion.use.fetchQuestions();
  const setCurrentQuestions = useQuestion.use.setCurrentQuestions();

  const usersArr = useUser.use.users();
  const currentUser = useUser.use.user();
  const currentTopic = useTopic.use.filter();

  useEffect(() => {
    fetchUsers();
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (currentTopic) setCurrentQuestions(currentTopic.id);
  }, [currentTopic, currentUser]);

  const onSelectUser = (userId: number) => {
    if (userId && currentUser?.id !== userId && currentTopic) {
      setUser(userId);
      setCurrentQuestions(currentTopic.id);
    }
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
