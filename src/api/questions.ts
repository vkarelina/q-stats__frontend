import { AxiosResponse } from 'axios';

import { Question, QuestionTopic } from '../types';
import api from './index';

export const fetchUserQuestions = async (
  topicId: number,
  userId: number,
): Promise<Question[]> => {
  const response: AxiosResponse<Question[]> = await api.get(
    `http://localhost:5000/users/${userId}/questions?topicId=${topicId}`,
  );
  return response.data;
};

export const fetchTopicQuestions = async (id: number): Promise<Question[]> => {
  const response: AxiosResponse<Question[]> = await api.get(
    `http://localhost:5000/topic/${id}/questions`,
  );
  return response.data;
};

export const fetchCreateTopicQuestion = async (
  data: Pick<Question, 'text'>,
  topicId: number,
): Promise<Question[]> => {
  const response: AxiosResponse<Question[]> = await api.post(
    `http://localhost:5000/topic/${topicId}/questions`,
    data,
  );
  return response.data;
};

export const fetchCreateUserQuestion = async (
  data: QuestionTopic,
  userId: number,
): Promise<Question[]> => {
  const response: AxiosResponse<Question[]> = await api.post(
    `http://localhost:5000/users/${userId}/questions`,
    data,
  );
  return response.data;
};

export const fetchUpdateTopicQuestion = async (
  data: Pick<Question, 'text'>,
  questionId: number,
  topicId: number,
): Promise<Question[]> => {
  const response: AxiosResponse<Question[]> = await api.patch(
    `http://localhost:5000/topic/${topicId}/questions/${questionId}`,
    data,
  );
  return response.data;
};
