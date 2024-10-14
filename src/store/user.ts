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
  fetchUser: (userId: number) => void;
  fetchSession: (userId: number, topicId: number) => void;
  fetchClearCurrentUser: () => void;
  fetchClearSession: () => void;
}

const useUserStore = create<UseUserStore>()(
  devtools(
    immer((set, get) => ({
      users: [],
      user: null,
      session: [],

      fetchUsers: () => {
        const users = fetchUsers();
        set({ users }, false, 'fetchUsers');
      },

      fetchUser: (userId: number) => {
        const { users } = get();
        const user = users?.find((user) => user.id === userId);
        set({ user }, false, 'fetchUser');
      },

      fetchSession: (userId: number, topicId: number) => {
        const { questions } = useQuestion.getState();
        const session = fetchSession(questions, userId, topicId);

        set({ session }, false, 'fetchSession');
      },

      fetchClearCurrentUser: () => {
        set({ user: null }, false, 'fetchClearCurrentUser');
      }, 

      fetchClearSession: () => {
        set({ session: [] }, false, 'fetchClearCurrentUser');
      }, 
    })),
  ),
);

const useUser = createSelectors(useUserStore);

export default useUser;
