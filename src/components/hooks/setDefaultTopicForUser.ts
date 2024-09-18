import { useCallback } from "react";

import useUser from "../../store/user";
import useFilter from "../../store/filter";

const useSetDefaultTopicForUser = () => {
  const setUsers = useUser((state) => state.setUsers);
  const setUser = useUser((state) => state.setUser);
  const users = useUser((state) => state.users);

  const setCurrentTopicsQuestions = useFilter(
    (state) => state.setCurrentTopicsQuestions
  );

  const setDefaultTopicForUser = useCallback(
    (userId: number) => {
      const filter = setCurrentTopicsQuestions();

      if (!users || !filter) return;

      const user = users.find((user) => user.id === userId);

      if (!user) return;

      const questions = user.topics.find((topic) => topic.name === filter.name);

      if (!questions) {
        const updatedTopics = [...user.topics, filter];

        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, topics: updatedTopics } : user
        );

        setUsers(updatedUsers);
      }

      setUser(user);
    },
    [users]
  );

  return setDefaultTopicForUser;
};

export default useSetDefaultTopicForUser;
