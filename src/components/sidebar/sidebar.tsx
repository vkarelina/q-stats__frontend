import "./sidebar.css";

import { useEffect, useState } from "react";

import useStore from "../../store";
import { mockUserData } from "../../mockdata";

const Sidebar = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const setUsers = useStore((state) => state.setUsers);
  const setQuestions = useStore((state) => state.setQuestions);
  const users = useStore.use.users();
  const filter = useStore.use.filter();

  useEffect(() => {
    if (userId && filter) setQuestions(Number(userId));
  }, [userId, filter]);

  const onSelectUser = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (target instanceof HTMLElement && target.dataset.user) {
      if (userId === target.dataset.user) return;
      setUserId(target.dataset.user);
    }
  };

  useEffect(() => {
    setUsers(mockUserData);
  }, []);

  return (
    <div className="wrapper-sidebar">
      {users &&
        users.map((user) => (
          <div key={user.id} onClick={onSelectUser} data-user={user.id}>
            {user.name.split("")[0]}
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
