import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createSelectors from './create-selectors';
import { fetchUpdateAnswerStatus } from '../api';
import { fetchGetAnswers } from '../api/answers';
import { Topic, User } from '../types';
import { formatDate } from '../utils/date';

type Answer = {
  date: string;
  answers: Record<string, { id: string; response: string; createdAt: string }>;
};

interface UseAnswersStore {
  answers: Answer[];

  fetchAnswers: (user: User, topic: Topic) => void;
  fetchUpdateAnswerStatus: (params: {
    status: boolean | null;
    date: Date;
    userQuestionId: number;
    topicId: number;
    userId: number;
  }) => void;
}

const useAnswersStore = create<UseAnswersStore>()(
  devtools((set) => ({
    answers: [],
    fetchAnswers: async (user, topic) => {
      if (user && topic) {
        try {
          const response = await fetchGetAnswers(user.id, topic.id);
          const formattedAnswers = response.map((item) => ({
            date: item.date,
            answers: item.answers.reduce((acc, answer) => {
              acc[answer.userQuestionId] = {
                id: answer.id,
                response: answer.response,
                createdAt: answer.createdAt,
              };
              return acc;
            }, {}),
          }));

          const date = formatDate(new Date());
          const foundDate = formattedAnswers.find((a) => a.date === date);

          if (!foundDate) {
            formattedAnswers.push({ date, answers: {} });
          }

          set({ answers: formattedAnswers }, false, 'fetchAnswers');
          console.log(formattedAnswers);
        } catch (error) {
          console.error('Error fetching answers:', error);
        }
      }
    },

    // fetchUpdateAnswerStatus: async ({
    //   status,
    //   date,
    //   userQuestionId,
    //   topicId,
    //   userId,
    // }) => {
    //   console.log(userQuestionId);

    //   const response = await fetchUpdateAnswerStatus(
    //     { response: status, date, userQuestionId },
    //     userId,
    //     topicId,
    //   );

    //   set(
    //     ({ answers }) => {
    //       const today = formatDate(new Date());
    //       if (formatDate(date) !== today) return;
    //       console.log(date);
    //       const findedAnswerIndex = answers.findIndex((a) => a.date === today);

    //       if (findedAnswerIndex !== -1) {
    //         const answersForToday = answers[findedAnswerIndex].answers;

    //         const updatedAnswers = {
    //           ...answersForToday,
    //           [userQuestionId]: {
    //             ...response,
    //           },
    //         };

    //         return {
    //           answers: [
    //             {
    //               ...answers[findedAnswerIndex],
    //               answers: updatedAnswers,
    //             },
    //             ...answers.filter((_, index) => index !== findedAnswerIndex),
    //           ],
    //         };
    //       }
    //       return { answers };
    //     },
    //     false,
    //     'fetchUpdateAnswerStatus',
    //   );
    // },
    fetchUpdateAnswerStatus: async ({
      status,
      date,
      userQuestionId,
      topicId,
      userId,
    }) => {
      console.log(userQuestionId);

      const response = await fetchUpdateAnswerStatus(
        { response: status, date, userQuestionId },
        userId,
        topicId,
      );

      set(
        ({answers}) => {
          const today = formatDate(new Date());
          if (formatDate(date) !== today) return answers;

          console.log(date);
          const findedAnswerIndex = answers.findIndex(
            (a) => a.date === today,
          );

          if (findedAnswerIndex !== -1) {
            const answersForToday = answers[findedAnswerIndex].answers;
            console.log();

            const updatedAnswers = {
              ...answersForToday,
              [userQuestionId]: {...response},
            };

            console.log(updatedAnswers);


            return {
              answers: [
                {
                  ...answers[findedAnswerIndex],
                  answers: updatedAnswers,
                },
                ...answers.filter(
                  (_, index) => index !== findedAnswerIndex,
                ),
              ],
            };
          }
        },
        false,
        'fetchUpdateAnswerStatus',
      );
    },
  })),
);

const useAnswers = createSelectors(useAnswersStore);

export default useAnswers;
