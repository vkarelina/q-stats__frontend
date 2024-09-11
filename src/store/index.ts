import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../types";

interface UseTabStore {
  user: User[] | null;
  filter: string | null;
  getUser: () => void;
  setUser: (mockedUser: User[]) => void;
  getFilter: () => void;
  setFilter: (filter: string) => void;
}

export const useTabStore = create<UseTabStore>()(
  devtools(
    (set, get) => ({
      user: null,
      filter: null,

      getUser: () => {
        const { user } = get();
        return user;
      },

      setUser: (mockedUser: User[]) => {
        set({ user: mockedUser }, false, "setUser");
      },

      getFilter: () => {
        const { filter } = get();
        return filter;
      },

      setFilter: (filter: string) => {
        set({ filter }, false, "setFilter");
      },
    }),
    { name: "TabStore" }
  )
);
