import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  fetchCreateTopicQuestion,
  fetchCreateUserQuestion,
  fetchDeleteTopicQuestion,
  fetchDeleteUserQuestion,
  fetchTopicQuestions,
  fetchUpdateTopicQuestion,
  fetchUpdateUserQuestion,
  fetchUserQuestions,
} from '../api';
import { DtoUpdateUserQuestion, Question } from '../types';
import createSelectors from './create-selectors';
import useUser from './user';

interface UseQuestionStore {
  questions: Question[];

  getQuestions: (topicId: number, userId?: number) => void;
  createQuestion: (
    text: Pick<Question, 'text'>,
    topicId: number,
    userId?: number,
  ) => void;
  updateTopicQuestion: (
    text: Pick<Question, 'text'>,
    questionId: number,
    topicId?: number,
    refreshQuestions?: () => void,
  ) => void;
  updateUserQuestion: (
    data: DtoUpdateUserQuestion,
    userId: number,
    refreshQuestions?: () => void,
  ) => void;
  fetchDeleteQuestion: (topicId: number, questionId: number) => void;
}

const useQuestionStore = create<UseQuestionStore>()(
  devtools(
    immer((set) => ({
      questions: [],

      getQuestions: async (topicId: number, userId?: number) => {
        const questions = await (userId
          ? fetchUserQuestions(topicId, userId)
          : fetchTopicQuestions(topicId));

        set({ questions }, false, 'fetchQuestions');
      },

      createQuestion: async (
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

      updateTopicQuestion: async (
        text: Pick<Question, 'text'>,
        questionId: number,
        topicId?: number,
        refreshQuestions?: () => void,
      ) => {
        if (topicId) await fetchUpdateTopicQuestion(text, questionId, topicId);
        if (refreshQuestions) refreshQuestions();
      },

      updateUserQuestion: async (
        data: DtoUpdateUserQuestion,
        userId: number,
        refreshQuestions?: () => void,
      ) => {
        await fetchUpdateUserQuestion(data, userId);
        if (refreshQuestions) refreshQuestions();
      },

      fetchDeleteQuestion: async (id: number, questionId: number) => {
        const { user } = useUser.getState();

        const deleteQuestion = user
          ? fetchDeleteUserQuestion
          : fetchDeleteTopicQuestion;

        await deleteQuestion(id, questionId);

        set((state) => ({
          questions: state.questions.filter(
            (question) => question.id !== questionId,
          ),
        }));
      },
    })),
  ),
);

const useQuestion = createSelectors(useQuestionStore);

export default useQuestion;
