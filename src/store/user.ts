import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createSelectors from "./createSelectors";
import { User } from "../types";
import useTab from "./tab";

interface UseUserStore {
  users: User[] | null;
  user: User | null;
  getUser: () => void;
  setUsers: (mockedUser: User[]) => void;
  setCurrentUser: (userId: number) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    (set, get) => ({
      users: null,
      user: null,

      getUser: () => get().users,

      setUsers: (mockedUser: User[]) => {
        set({ users: mockedUser }, false, "setUsers");
      },

      setCurrentUser: (userId: number) => {
        const users = get().users;
        const setCurrentThemeQuestions = useTab.getState().setCurrentThemeQuestions;
        const filter = setCurrentThemeQuestions();

        if (!users || !filter) return;

        const user = users.find((user) => user.id === userId);

        if (!user) return;

        const questions = user.themes.find(
          (theme) => theme.name === filter.name
        );

        if (!questions) {
          const updatedThemes = [...user.themes, filter];

          set(
            (state) => {
              const updatedUsers = state.users?.map((user) => {
                return user.id === userId
                  ? { ...user, themes: updatedThemes }
                  : user;
              });

              return { users: updatedUsers };
            },
            false,
            "setUsers"
          );
          set({ user: user }, false, "setUser");
        } else {
          set({ user: user }, false, "setUser");
        }
      },
    }),
    { name: "UserStore" }
  )
);

const useUser = createSelectors(useUserStore);

export default useUser;
