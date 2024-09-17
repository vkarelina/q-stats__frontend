import "./sidebar.css";

import { useEffect, useState } from "react";

import { mockUserData } from "../../mockdata";
import useRootStore from "../../store";

const Sidebar = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const userStore = useRootStore((state) => state.userStore);
  const tabStore = useRootStore((state) => state.tabStore);

  const setUsers = userStore((state) => state.setUsers);
  const setCurrentUser = userStore((state) => state.setCurrentUser);

  const users = userStore.use.users();
  const filter = tabStore.use.filter();

  useEffect(() => {
    if (userId && filter) setCurrentUser(Number(userId));
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
