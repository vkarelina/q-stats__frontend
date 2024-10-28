import { AxiosResponse } from 'axios';

import api from './index';
import { User } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await api.get(
    'http://localhost:5000/users',
  );
  return response.data;
};

export const fetchUser = async (id: number): Promise<User> => {
  const response: AxiosResponse<User> = await api.get(
    `http://localhost:5000/users/${id}`,
  );
  return response.data;
};
