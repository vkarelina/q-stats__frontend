// import { useCallback } from "react";

// import useUser from "../store/user";
// import useTopic from "../store/topic";

// const useSetDefaultTopicForUser = () => {
//   const setUpdateUser = useUser.use.setUpdateUser();
//   const setUser = useUser.use.setUser();
//   const users = useUser.use.users();

//   const setCurrentTopicsQuestions = useTopic.use.setCurrentTopicsQuestions();

//   const setDefaultTopicForUser = useCallback(
//     (userId: number) => {
//       const currentTopic = setCurrentTopicsQuestions();

//       if (!users || !currentTopic) return;

//       const user = users.find((user) => user.id === userId);

//       if (!user) return;

//       const questions = user.topics.find(
//         (topic) => topic.name === currentTopic.name
//       );

//       if (!questions) {
//         setUpdateUser(userId, currentTopic);
//       }

//       setUser(userId);
//     },
//     [users]
//   );

//   return setDefaultTopicForUser;
// };

// export default useSetDefaultTopicForUser;
