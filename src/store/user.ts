import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createSelectors from "./create-selectors";
import { User } from "../types";

interface UseUserStore {
  users: User[] | null;
  user: User | null;
  setUsers: (users: User[]) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools((set) => ({
    users: null,
    user: null,

    setUsers: (users: User[]) => {
      set({ users: users }, false, "setUsers");
    },

    setUser: (user: User) => {
      set({ user: user }, false, "setUser");
    },
  }))
);

const useUser = createSelectors(useUserStore);

export default useUser;
