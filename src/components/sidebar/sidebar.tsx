import "./sidebar.css";

import { useEffect, useState } from "react";

import { mockUserData } from "../../mock-data";
import useUser from "../../store/user";
import useTopic from "../../store/topic";
import useSetDefaultTopicForUser from "../../hooks/setDefaultTopicForUser";

const Sidebar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const setDefaultTopicForUser = useSetDefaultTopicForUser();

  const setUsers = useUser.use.setUsers();
  const users = useUser.use.users();
  const filter = useTopic.use.filter();

  useEffect(() => {
    if (userId && filter) setDefaultTopicForUser(Number(userId));
  }, [userId, filter]);

  const onSelectUser = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (
      target instanceof HTMLElement &&
      target.dataset.user &&
      userId !== target.dataset.user
    ) {
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
