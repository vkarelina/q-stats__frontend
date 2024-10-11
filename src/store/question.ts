import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Question } from '../types';
import createSelectors from './create-selectors';
import { fetchQuestionByTopic, fetchQuestions } from '../api';

interface UseQuestionStore {
  questions: Question[] | [];

  fetchQuestions: () => void;
  fetchQuestionByTopic: (topicId: number) => void;
  fetchUpdateDefaultQuestion: (questionId: number, text: string) => void;
}

const useQuestionStore = create<UseQuestionStore>()(
  devtools(
    immer((set, get) => ({
      questions: [],

      fetchQuestions() {
        const { questions } = get();

        if (!questions.length) {
          const questionsMock = fetchQuestions();
          set({ questions: questionsMock }, false, 'setQuestionsMock');
          return;
        }

        set({ questions: questions }, false, 'setQuestions');
      },

      fetchQuestionByTopic(topicId) {
        const questions = fetchQuestionByTopic(topicId);
        set({ questions }, false, 'setQuestions');
      },

      fetchUpdateDefaultQuestion(questionId: number, text: string) {
        set(
          (state) => {
            const questionToUpdate = state.questions.find(
              (question) => question.id === questionId,
            );

            if (questionToUpdate) questionToUpdate.text = text;
          },
          false,
          'fetchUpdateDefaultQuestion',
        );
      },
    })),
  ),
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
