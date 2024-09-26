import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Question } from "../types";
import createSelectors from "./create-selectors";
import { questions } from "../mock-data";

interface UseQuestionStore {
  questions: Question[] | null;
  currentQuestions: Question[] | null;

  fetchQuestions: () => void;
  setCurrentQuestions: (topicId: number) => void;
}

const useQuestionStore = create<UseQuestionStore>()(
  devtools(
    immer((set, get) => ({
      questions: null,
      currentQuestions: null,

      fetchQuestions() {
        set({ questions }, false, "setQuestions");
      },

      setCurrentQuestions(topicId: number) {
        const questions = get().questions;
        const currentQuestions = questions?.filter(question => question.topicId === topicId)
        set({ currentQuestions }, false, "setCurrentQuestions");
      },
    }))
  )
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
