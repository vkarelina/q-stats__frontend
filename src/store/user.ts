import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createSelectors from "./create-selectors";
import { User } from "../types";
import { users } from "../mock-data";

interface UseUserStore {
  users: User[] | null;
  user: User | null;

  fetchUsers: () => void;
  setUser: (userId: number) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set, get) => ({
      users: null,
      user: null,

      fetchUsers: () => {
        set({ users }, false, "setUsers");
      },

      setUser: (userId: number) => {
        console.log(1111111)
        const users = get().users;
        const user = users?.find((user) => user.id === userId);
        set({ user }, false, "setUser");
      },
    }))
  )
);

const useUser = createSelectors(useUserStore);

export default useUser;
