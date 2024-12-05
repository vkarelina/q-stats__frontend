import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createSelectors from './create-selectors';
import { fetchAnswers, fetchUpdateAnswerStatus } from '../api/answers';
import { formatDate } from '../helpers/formatDate';
import { Answer, AnswerStatus, Topic, User } from '../types';

interface FormattedAnswers {
  date: string;
  answers: Record<number, Omit<AnswerStatus, 'userQuestionId'>>;
}

interface UpdateAnswerStatusResponse {
  answer: Omit<AnswerStatus, 'userQuestionId'>;
  isCopiedQuestion: boolean;
}

interface UseAnswersStore {
  answers: FormattedAnswers[];

  fetchAnswers: (user?: User, topic?: Topic) => void;
  fetchUpdateAnswerStatus: (params: {
    status: boolean | null;
    date: Date;
    userQuestionId: number;
    topicId: number;
    userId: number;
  }) => Promise<UpdateAnswerStatusResponse>;
}
const useAnswersStore = create<UseAnswersStore>()(
  devtools((set) => ({
    answers: [],

    fetchAnswers: async (user, topic) => {
      if (user && topic) {
        try {
          const response = await fetchAnswers(user.id, topic.id);

          const formattedAnswers: FormattedAnswers[] = response.map(
            (answer: Answer) => ({
              date: answer.date,
              answers: answer.answers.reduce(
                (
                  acc: Record<number, Omit<AnswerStatus, 'userQuestionId'>>,
                  answer: AnswerStatus,
                ) => {
                  acc[answer.userQuestionId] = {
                    id: answer.id,
                    status: answer.status,
                    createdAt: answer.createdAt,
                  };
                  return acc;
                },
                {},
              ),
            }),
          );

          const date = formatDate(new Date());
          const foundDate = formattedAnswers.find(
            (answer) => answer.date === date,
          );

          if (!foundDate) {
            formattedAnswers.push({ date, answers: {} });
          }

          set({ answers: formattedAnswers }, false, 'fetchAnswers');
        } catch (error) {
          console.error('Error fetching answers:', error);
        }
      }
    },

    fetchUpdateAnswerStatus: async ({
      status,
      date,
      userQuestionId,
      topicId,
      userId,
    }) => {
      return await fetchUpdateAnswerStatus(
        { status, date, userQuestionId },
        userId,
        topicId,
      );
    },
  })),
);

const useAnswers = createSelectors(useAnswersStore);

export default useAnswers;
