import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Question } from "../types";
import createSelectors from "./create-selectors";
import { fetchSession } from "../api/api";

interface UseQuestionStore {
  questions: Question[] | null;

  fetchQuestions: (userId: number, topicId: number) => void;
}

const useQuestionStore = create<UseQuestionStore>()(
  devtools(
    immer((set) => ({
      questions: null,

      fetchQuestions(userId, topicId) {
        const questions = fetchSession(userId, topicId);
        set({ questions }, false, "setQuestions");
      },
    }))
  )
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
