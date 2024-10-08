import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import createSelectors from './create-selectors';
import { fetchSession, fetchUpdateSession, fetchUsers } from '../api';
import { Question, SessionRecord, User } from '../types';

interface UseUserStore {
  users: User[] | null;
  user: User | null;
  session: SessionRecord[] | null;

  fetchUsers: () => void;
  setUser: (userId: number) => void;
  fetchSession: (userId: number, topicId: number) => void;
  fetchUpdateSession: (
    userId: number,
    topicId: number,
    newQuestion: Question,
    oldQuestionId: number,
  ) => void;
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
        const { users } = get();
        const user = users?.find((user) => user.id === userId);
        set({ user }, false, 'setUser');
      },

      fetchSession: (userId: number, topicId: number) => {
        const session = fetchSession(userId, topicId);
        set({ session }, false, 'setSession');
      },

      fetchUpdateSession: (
        userId: number,
        topicId: number,
        newQuestion: Question,
        oldQuestionId: number,
      ) => {
        const { session } = get();
        const newSession = fetchUpdateSession(
          userId,
          topicId,
          newQuestion,
          oldQuestionId,
          session,
        );
        set({ session: newSession }, false, 'setUpdateSession');
      },
    })),
  ),
);

const useUser = createSelectors(useUserStore);

export default useUser;
