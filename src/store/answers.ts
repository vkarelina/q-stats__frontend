import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Answer } from "../types";
import createSelectors from "./create-selectors";
import { fetchAddAnswer, fetchAnswers, fetchUserAnswers } from "../api/api";

interface UseAnswerStore {
  answers: Answer[] | null;
  userAnswers: Answer[] | null;

  fetchUserAnswers: (userId: number) => void;
  fetchAnswers: () => void;
  fetchAddAnswer: (userId: number, questionId: number) => void;
}

const useAnswerStore = create<UseAnswerStore>()(
  devtools(
    immer((set, get) => ({
      answers: null,
      userAnswers: null,

      fetchAnswers() {
        const answers = fetchAnswers();
        set({ answers }, false, "setAnswers");
      },

      fetchUserAnswers(userId) {
        const userAnswers = fetchUserAnswers(userId);
        set({ userAnswers }, false, "setAnswers");
      },

      fetchAddAnswer(userId: number, questionId: number) {
        const newAnswer = fetchAddAnswer(userId, questionId);
        const answers = get().answers;
        answers?.push(newAnswer);
      },
    }))
  )
);

const useAnswer = createSelectors(useAnswerStore);

export default useAnswer;
