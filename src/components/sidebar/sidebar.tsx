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
  }, [currentTopic]);

  const onSelectUser = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (!(target instanceof HTMLElement)) return;

    const userId = Number(target.dataset.user_id);

    if (userId && currentUser?.id !== userId && currentTopic) {
      setUser(userId);
      console.log(currentTopic.id);
      setCurrentQuestions(currentTopic.id);
    }
  };

  return (
    <div className="wrapper-sidebar">
      {usersArr &&
        usersArr.map((user) => (
          <div
            key={user.id}
            onClick={onSelectUser}
            className={
              currentUser && user.id === currentUser.id ? "active" : ""
            }
          >
            <span data-user_id={user.id}>{user.name.split("")[0]}</span>
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
