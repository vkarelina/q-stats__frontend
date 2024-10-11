import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import createSelectors from './create-selectors';
import { fetchSession, fetchUsers } from '../api';
import { SessionRecord, User } from '../types';
import useQuestion from './question';

interface UseUserStore {
  users: User[];
  user: User | null;
  session: SessionRecord[];

  fetchUsers: () => void;
  setUser: (userId: number) => void;
  fetchSession: (userId: number, topicId: number) => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set, get) => ({
      users: [],
      user: null,
      session: [],

      fetchUsers: () => {
        const users = fetchUsers();
        set({ users }, false, 'setUsers');
      },

      setUser: (userId: number) => {
        const { users } = get();
        const user = users?.find((user) => user.id === userId);
        set({ user }, false, 'setUser');
      },

      fetchSession: (userId: number, topicId: number) => {
        const { questions } = useQuestion.getState();
        const session = fetchSession(questions, userId, topicId);

        set({ session }, false, 'setSession');
      },
    })),
  ),
);

const useUser = createSelectors(useUserStore);

export default useUser;
