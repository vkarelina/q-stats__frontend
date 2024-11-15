import { Question } from '../types';
import { getShortDate } from '../utils/date';

export const getUniqueDates = (questions: Question[]): string[] => {
  const dates = questions.flatMap((question) =>
    question.answers?.map((answer) => getShortDate(answer.createdAt)),
  );
  
  dates.push(getShortDate(new Date()));

  return Array.from(
    new Set(
      dates.sort(
        (a, b) =>
          new Date(a.split('.').reverse().join('-')).getTime() -
          new Date(b.split('.').reverse().join('-')).getTime(),
      ),
    ),
  );
}; 
