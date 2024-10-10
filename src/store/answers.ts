import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Answer } from '../types';
import createSelectors from './create-selectors';
import { fetchAddAnswer, fetchAnswers, fetchUserAnswers } from '../api';

interface UseAnswerStore {
  answers: Answer[] | [];
  userAnswers: Answer[] | [];

  fetchUserAnswers: (userId: number) => void;
  fetchAnswers: () => void;
  fetchAddAnswer: (userId: number, questionId: number) => void;
}

const useAnswerStore = create<UseAnswerStore>()(
  devtools(
    immer((set, get) => ({
      answers: [],
      userAnswers: [],

      fetchAnswers() {
        const answers = fetchAnswers();
        set({ answers }, false, 'setAnswers');
      },

      fetchUserAnswers(userId) {
        const userAnswers = fetchUserAnswers(userId);
        set({ userAnswers }, false, 'setAnswers');
      },

      fetchAddAnswer(userId: number, questionId: number) {
        const newAnswer: Answer = fetchAddAnswer(userId, questionId);
        const answers = get().answers;
        answers.push(newAnswer);
      },
    })),
  ),
);

const useAnswer = createSelectors(useAnswerStore);

export default useAnswer;
