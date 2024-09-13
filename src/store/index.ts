import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Questions, User } from "../types";
import createSelectors from "./createSelectors";

interface UseTabStore {
  users: User[] | null;
  questions: Questions[] | null;
  filter: string | null;
  themes: string[] | null;
  getUser: () => void;
  setUsers: (mockedUser: User[]) => void;
  setQuestions: (userId: number) => void;
  getFilter: () => void;
  setFilter: (filter: string) => void;
  setTheme: (mockedTheme: string[]) => void;
}

const useTabStore = create<UseTabStore>()(
  devtools(
    (set, get) => ({
      users: null,
      questions: null,
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
        const user = users?.find((user) => user.id === userId);
        if(!user) return;
        const filter = get().filter;
        const questions = user.themes.find((theme) => theme.name === filter);
        if(!questions) return;
        set({ questions: questions.questions }, false, "setQuestions");
      },

      setFilter: (filter: string) => {
        set({ filter }, false, "setFilter");
      },

      setTheme: (mockedTheme: string[]) => {
        set({ themes: mockedTheme }, false, "setTheme");
      },
    }),
    { name: "TabStore" }
  )
);

const useStore = createSelectors(useTabStore)

export default useStore;
