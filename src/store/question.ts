import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Question } from '../types';
import createSelectors from './create-selectors';
import { fetchUserQuestions } from '../api/questions';

interface UseQuestionStore {
  questions: Question[];

  fetchUserQuestions: (userId: number) => void;
  fetchTopicQuestions: (topicId: number) => void;
}

const useQuestionStore = create<UseQuestionStore>()(
  devtools(
    immer((set) => ({
      questions: [],

      fetchUserQuestions: async (userId) => {
        const questions = await fetchUserQuestions(userId);
        set({ questions }, false, 'fetchUserQuestions');
      },

      fetchTopicQuestions: async (topicId) => {
        const questions = await fetchUserQuestions(topicId);
        set({ questions }, false, 'fetchUserQuestions');
      },
    })),
  ),
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
