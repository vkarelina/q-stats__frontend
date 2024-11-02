import { User } from '../types';
import api from './index';

export const fetchUsers = () => (
  api.get<User[]>('users').then((res) => res.data)
);

export const fetchUser = (id: number) => (
  api.get<User>(`users/${id}`).then((res) => res.data)
);
