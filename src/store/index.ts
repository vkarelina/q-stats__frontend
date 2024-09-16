import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Theme, User } from "../types";
import createSelectors from "./createSelectors";

interface UseTabStore {
  users: User[] | null;
  user: User | null;
  filter: Theme | null;
  themes: Theme[] | null;
  getUser: () => void;
  setUsers: (mockedUser: User[]) => void;
  setQuestions: (userId: number) => void;
  getFilter: () => void;
  setFilter: (filter: string) => void;
  setTheme: (mockedTheme: Theme[]) => void;
}

const useTabStore = create<UseTabStore>()(
  devtools(
    (set, get) => ({
      users: null,
      user: null,
      filter: null,
      themes: null,

      getUser: () => get().users,
      getFilter: () => get().filter,
      getTheme: () => get().themes,

      setUsers: (mockedUser: User[]) => {
        set({ users: mockedUser }, false, "setUsers");
      },

      setQuestions: (userId: number) => {
        const users = get().users;
        const filter = get().filter;
        const user = users?.find((user) => user.id === userId);

        if (!user || !filter) return;

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
        } else {
          set({ user: user }, false, "setUser");
        }
      },

      setFilter: (filter: string) => {
        const themes = get().themes;
        if(!themes) return;
        const theme = themes.find((theme) => theme.name === filter);
        if(!theme) return;
        set(
          { filter: { name: filter, questions: theme.questions } },
          false,
          "setFilter"
        );
      },

      setTheme: (mockedTheme: Theme[]) => {
        set({ themes: mockedTheme }, false, "setTheme");
      },
    }),
    { name: "TabStore" }
  )
);

const useStore = createSelectors(useTabStore);

export default useStore;
