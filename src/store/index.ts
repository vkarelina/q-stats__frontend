import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../types";

interface UseTabStore {
  user: User[] | null;
  filter: string | null;
  themes: string[] | null;
  getUser: () => void;
  setUser: (mockedUser: User[]) => void;
  getFilter: () => void;
  setFilter: (filter: string) => void;
  setTheme: (mockedTheme: string[]) => void;
}

export const useTabStore = create<UseTabStore>()(
  devtools(
    (set, get) => ({
      user: null,
      filter: null,
      themes: null,

      getUser: () => get().user,
      getFilter: () => get().filter,
      getTheme: () => get().themes,

      setUser: (mockedUser: User[]) => {
        set({ user: mockedUser }, false, "setUser");
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
