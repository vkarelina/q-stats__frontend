import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Answer } from "../types";
import createSelectors from "./create-selectors";
import { fetchAnswers, fetchUserAnswers } from "../api/api";

interface UseAnswerStore {
  answers: Answer[] | null;
  userAnswers: Answer[] | null;

  fetchUserAnswers: (userId: number) => void;
  fetchAnswers: () => void;
}

const useAnswerStore = create<UseAnswerStore>()(
  devtools(
    immer((set) => ({
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
    }))
  )
);

const useAnswer = createSelectors(useAnswerStore);

export default useAnswer;
