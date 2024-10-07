import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import createSelectors from './create-selectors';
import { fetchSession, fetchUsers } from '../api';
import { SessionRecord, User } from '../types';

interface UseUserStore {
  users: User[] | null;
  user: User | null;
  session: SessionRecord[] | null;

  fetchUsers: () => void;
  setUser: (userId: number) => void;
  fetchSession: (userId: number, topicId: number) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set, get) => ({
      users: null,
      user: null,
      session: null,

      fetchUsers: () => {
        const users = fetchUsers();
        set({ users }, false, 'setUsers');
      },

      setUser: (userId: number) => {
        const users = get().users;
        const user = users?.find((user) => user.id === userId);
        set({ user }, false, 'setUser');
      },

      fetchSession: (userId: number, topicId: number) => {
        const session = fetchSession(userId, topicId);
        set({ session }, false, 'setSession');
      },
    })),
  ),
);

const useUser = createSelectors(useUserStore);

export default useUser;
