import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { fetchUser, fetchUsers } from '../api/user';
import { User } from '../types';
import createSelectors from './create-selectors';

interface UseUserStore {
  users: User[];
  user: User | null;

  fetchUsers: () => void;
  fetchUser: (id: number) => void;
  setResetUser: () => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set) => ({
      users: [],
      user: null,

      fetchUsers: async () => {
        const users = await fetchUsers();
        set({ users }, false, 'fetchUsers');
      },

      fetchUser: async (id) => {
        const user = await fetchUser(id);
        set({ user }, false, 'fetchUsers');
      },

      setResetUser: () => set({ user: null }, false, 'setResetUser'),
    })),
  ),
);

const useUser = createSelectors(useUserStore);

export default useUser;
