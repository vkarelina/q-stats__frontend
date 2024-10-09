import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Question } from '../types';
import createSelectors from './create-selectors';
import { fetchAddQuestion, fetchQuestionByTopic, fetchSession } from '../api';

interface UseQuestionStore {
  questions: Question[] | null;

  fetchQuestions: (userId: number, topicId: number) => void;
  fetchQuestionByTopic: (topicId: number) => void;
  fetchAddQuestion: (question: Question) => void;
}

const useQuestionStore = create<UseQuestionStore>()(
  devtools(
    immer((set, get) => ({
      questions: null,

      fetchQuestions(userId, topicId) {
        const questions = fetchSession(userId, topicId);
        set({ questions }, false, 'setQuestions');
      },

      fetchQuestionByTopic(topicId) {
        const questions = fetchQuestionByTopic(topicId);
        set({ questions }, false, 'setQuestions');
      },

      fetchAddQuestion(question) {
        const newQuestion = fetchAddQuestion(question);
        const questions = get().questions;
        questions?.push(newQuestion);
      },
    })),
  ),
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
