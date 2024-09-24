import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createSelectors from "./create-selectors";
import { Topic, User } from "../types";

interface UseUserStore {
  users: User[] | null;
  user: User | null;
  setUsers: (users: User[]) => void;
  setUser: (userId: number) => void;
  setUpdateUser: (userId: number, updateTopic: Topic) => void;
  setUpdateAnswer: (userId: number, topicId: number, questionId: number, answer: boolean) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set) => ({
      users: null,
      user: null,

      setUsers: (users: User[]) => {
        set({ users: users }, false, "setUsers");
      },

      setUser: (userId: number) => {
        set((state) => {
          const user = state.users?.find((user) => user.id === userId);
          if (user) state.user = user;
        });
      },

      setUpdateUser: (userId: number, updateTopic: Topic) => {
        set((state) => {
          state.users?.forEach((user: User) => {
            if (user.id === userId) user.topics.push(updateTopic);
          });
        });
      },

      setUpdateAnswer: (userId: number, topicId: number, questionId: number, answer: boolean) => {
        set((state) => {
          state.users?.forEach((user: User) => {
            if(user.id === userId) {
              user.topics[topicId].questions[questionId].answer = answer;
              state.user = user;
            }
          })
        })
      },
    }))
  )
);

const useUser = createSelectors(useUserStore);

export default useUser;
