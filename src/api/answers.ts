import { UpdateAnswerStatusPayload } from '../types';
import api from './index';

export const fetchAnswers = (userId: number, topicId: number) =>
  api
    .get(`http://localhost:5000/answers/user/${userId}/topic/${topicId}`)
    .then((res) => res.data);

export const fetchUpdateAnswerStatus = (
  data: UpdateAnswerStatusPayload,
  userId: number,
  topicId: number,
) => (
  api
    .post(`answers?userId=${userId}&topicId=${topicId}`, data)
    .then((res) => res.data)
);
