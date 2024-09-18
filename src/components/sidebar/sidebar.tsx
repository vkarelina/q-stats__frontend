import "./sidebar.css";

import { useEffect, useState } from "react";

import { mockUserData } from "../../mock-data";
import useUser from "../../store/user";
import useFilter from "../../store/filter";
import useSetDefaultTopicForUser from "../hooks/setDefaultTopicForUser";

const Sidebar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const setDefaultTopicForUser = useSetDefaultTopicForUser();

  const setUsers = useUser((state) => state.setUsers);

  const users = useUser.use.users();
  const filter = useFilter.use.filter();

  useEffect(() => {
    if (userId && filter) setDefaultTopicForUser(Number(userId));
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
