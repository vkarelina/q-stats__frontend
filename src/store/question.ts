import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  fetchCreateTopicQuestion,
  fetchCreateUserQuestion,
  fetchTopicQuestions,
  fetchUpdateTopicQuestion,
  fetchUserQuestions,
} from '../api';
import { Question } from '../types';
import createSelectors from './create-selectors';

interface UseQuestionStore {
  questions: Question[];

  fetchQuestions: (topicId: number, userId?: number) => void;
  fetchCreateQuestion: (
    text: Pick<Question, 'text'>,
    topicId: number,
    userId?: number,
  ) => void;
  fetchUpdateTopicQuestion: (
    text: Pick<Question, 'text'>,
    questionId: number,
    topicId?: number,
    refreshQuestions?: () => void,
  ) => void;
}

const useQuestionStore = create<UseQuestionStore>()(
  devtools(
    immer((set) => ({
      questions: [],

      fetchQuestions: async (topicId: number, userId?: number) => {
        const questions = await (userId
          ? fetchUserQuestions(topicId, userId)
          : fetchTopicQuestions(topicId));
        set({ questions }, false, 'fetchQuestions');
      },

      fetchCreateQuestion: async (
        text: Pick<Question, 'text'>,
        topicId: number,
        userId?: number,
      ) => {
        const newQuestion = await (userId
          ? fetchCreateUserQuestion({ ...text, topicId }, userId)
          : fetchCreateTopicQuestion(text, topicId));
        set((state) => ({ questions: [...state.questions, newQuestion] }));
      },

      fetchUpdateTopicQuestion: async (
        text: Pick<Question, 'text'>,
        questionId: number,
        topicId?: number,
        refreshQuestions?: () => void,
      ) => {
        if (topicId) await fetchUpdateTopicQuestion(text, questionId, topicId);
        if (refreshQuestions) refreshQuestions();
      },
    })),
  ),
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
