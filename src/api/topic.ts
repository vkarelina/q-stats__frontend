import { AxiosResponse } from 'axios';

import { Topic } from '../types';
import api from './index';

export const fetchTopics = async (): Promise<Topic[]> => {
  const response: AxiosResponse<Topic[]> = await api.get(
    'http://localhost:5000/topics',
  );
  return response.data;
};

export const fetchTopic = async (id: number): Promise<Topic> => {
  const response: AxiosResponse<Topic> = await api.get(
    `http://localhost:5000/topics/${id}`,
  );
  return response.data;
};
