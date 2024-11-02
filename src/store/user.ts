import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { fetchUser, fetchUsers } from '../api';
import { User } from '../types';
import createSelectors from './create-selectors';

interface UseUserStore {
  users: User[];
  user: User | null;

  fetchUsers: () => void;
  fetchUser: (id: number) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set, get) => ({
      users: [],
      user: null,

      fetchUsers: async () => {
        const users = await fetchUsers();
        set({ users }, false, 'fetchUsers');
      },

      fetchUser: async (id) => {
        const userId = get().user?.id;
        if (userId !== id) {
          const user = await fetchUser(id);
          set({ user }, false, 'fetchUsers');
        } else {
          set({ user: null }, false, 'setResetUser')
        }
      },
    })),
  ),
);

const useUser = createSelectors(useUserStore);

export default useUser;
