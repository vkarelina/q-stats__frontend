import { AxiosResponse } from 'axios';

import api from './index';
import { Question } from '../types';

export const fetchUserQuestions = async (id: number): Promise<Question[]> => {
  const response: AxiosResponse<Question[]> = await api.get(
    `http://localhost:5000/users/${id}/questions`,
  );
  return response.data;
};

export const fetchTopicQuestions = async (id: number): Promise<Question[]> => {
  const response: AxiosResponse<Question[]> = await api.get(
    `http://localhost:5000/topic/${id}/questions`,
  );
  return response.data;
};
