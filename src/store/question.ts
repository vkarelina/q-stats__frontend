import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  fetchCreateTopicQuestion,
  fetchCreateUserQuestion,
  fetchTopicQuestions,
  fetchUpdateAnswerStatus,
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
  fetchUpdateAnswerStatus: (
    status: boolean | null,
    date: Date,
    userQuestionId: number,
    topicId: number,
    userId: number,
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

        if (userId) newQuestion.answers = [];

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

      fetchUpdateAnswerStatus: async (
        status: boolean | null,
        date: Date,
        userQuestionId: number,
        topicId: number,
        userId: number,
        refreshQuestions?: () => void,
      ) => {
        const response = await fetchUpdateAnswerStatus(
          { response: status, date, userQuestionId },
          userId,
          topicId,
        );

        set((state) => {
          const questionIndex = state.questions.findIndex(
            (q) => q.id === userQuestionId,
          );
          const updatedQuestions = [...state.questions];

          const answers = updatedQuestions[questionIndex].answers || [];

          const answerIndex = answers.findIndex(
            (a) => a.id === response[0]?.id,
          );

          if (answerIndex !== -1) {
            updatedQuestions[questionIndex] = {
              ...updatedQuestions[questionIndex],
              answers: [
                ...answers.slice(0, answerIndex),
                {
                  ...answers[answerIndex],
                  ...response[0],
                },
                ...answers.slice(answerIndex + 1),
              ],
            };
          } else {
            updatedQuestions[questionIndex] = {
              ...updatedQuestions[questionIndex],
              answers: [...answers, { ...response }],
            };
          }

          return { questions: updatedQuestions };
        });

        if (refreshQuestions) refreshQuestions();
      },
    })),
  ),
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
