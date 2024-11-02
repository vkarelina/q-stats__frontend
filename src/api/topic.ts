import { Topic } from '../types';
import api from './index';

export const fetchTopics = () => (
  api.get<Topic[]>('topics').then((res) => res.data)
);

export const fetchTopic = (id: number) => (
  api.get<Topic>(`topics/${id}`).then((res) => res.data)
);
