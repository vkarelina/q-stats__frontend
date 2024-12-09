import { DtoUpdateUserQuestion, Question, QuestionTopic } from '../types';
import api from './index';

export const fetchUserQuestions = (topicId: number, userId: number) =>
  api
    .get<Question[]>(`users/${userId}/questions?topicId=${topicId}`)
    .then((res) => res.data);

export const fetchTopicQuestions = (id: number) =>
  api.get<Question[]>(`topic/${id}/questions`).then((res) => res.data);

export const fetchCreateTopicQuestion = (
  data: Pick<Question, 'text'>,
  topicId: number,
) =>
  api
    .post<Question>(`topic/${topicId}/questions`, data)
    .then((res) => res.data);

export const fetchCreateUserQuestion = (data: QuestionTopic, userId: number) =>
  api.post<Question>(`users/${userId}/questions`, data).then((res) => res.data);

export const fetchUpdateUserQuestion = (
  data: DtoUpdateUserQuestion,
  userId: number,
) => (
  api
    .patch<Question>(`users/${userId}/questions`, data)
    .then((res) => res.data)
);

export const fetchUpdateTopicQuestion = (
  data: Pick<Question, 'text'>,
  questionId: number,
  topicId: number,
) =>
  api
    .patch<Question[]>(`topic/${topicId}/questions/${questionId}`, data)
    .then((res) => res.data);

export const fetchDeleteTopicQuestion = (topicId: number, questionId: number) =>
  api
    .delete(`topic/${topicId}/questions/${questionId}`)
    .then((res) => res.data);

export const fetchDeleteUserQuestion = (userId: number, questionId: number) =>
  api.delete(`users/${userId}/questions/${questionId}`).then((res) => res.data);
