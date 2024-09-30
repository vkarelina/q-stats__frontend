import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createSelectors from "./create-selectors";
import { SessionRecord, User } from "../types";
import { fetchSession, fetchUsers } from "../api/api";

interface UseUserStore {
  users: User[] | null;
  user: User | null;
  sessia: SessionRecord[] | null;

  fetchUsers: () => void;
  setUser: (userId: number) => void;
  fetchSession: (userId: number, topicId: number) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set, get) => ({
      users: null,
      user: null,
      sessia: null,

      fetchUsers: () => {
        const users = fetchUsers();
        set({ users }, false, "setUsers");
      },

      setUser: (userId: number) => {
        const users = get().users;
        const user = users?.find((user) => user.id === userId);
        set({ user }, false, "setUser");
      },

      fetchSession: (userId: number, topicId: number) => {
        const sessia = fetchSession(userId, topicId);
        set({ sessia }, false, "setSession");
      }
    }))
  )
);

const useUser = createSelectors(useUserStore);

export default useUser;
