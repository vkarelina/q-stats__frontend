import axios from 'axios';

export * from './questions';
export * from './user';
export * from './topic';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
