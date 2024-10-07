import { Answer, Question, Topic, User } from '../types';

export const users: User[] = [
  {
    id: 1,
    name: 'AUser One',
  },
  {
    id: 2,
    name: 'BUser Two',
  },
  {
    id: 3,
    name: 'CUser Three',
  },
];

export const answers: Answer[] = [
  {
    id: 1,
    questionId: 1,
    userId: 2,
    answer: true,
    date: new Date(2024, 9, 24),
  },
  {
    id: 2,
    questionId: 1,
    userId: 2,
    answer: false,
    date: new Date(2024, 9, 24),
  },
  {
    id: 3,
    questionId: 2,
    userId: 2,
    answer: null,
    date: new Date(2024, 9, 24),
  },
  {
    id: 4,
    questionId: 3,
    userId: 2,
    answer: null,
    date: new Date(2024, 9, 24),
  },
  {
    id: 5,
    questionId: 4,
    userId: 2,
    answer: null,
    date: new Date(2024, 9, 24),
  },
];

export const questions: Question[] = [
  {
    id: 1,
    topicId: 1,
    text: 'Question react 1',
    isDefault: true,
  },
  {
    id: 2,
    topicId: 1,
    text: 'Question react 2',
    isDefault: true,
  },
  {
    id: 3,
    topicId: 2,
    text: 'Question Nest 3',
    isDefault: true,
  },
  {
    id: 4,
    topicId: 2,
    text: 'Question Nest 4',
    isDefault: true,
  },
  {
    id: 3,
    topicId: 3,
    text: 'Question Node 5',
    isDefault: true,
  },
  {
    id: 4,
    topicId: 3,
    text: 'Question Node 6',
    isDefault: true,
  },
  {
    id: 3,
    topicId: 4,
    text: 'Question TypeScript 7',
    isDefault: true,
  },
  {
    id: 4,
    topicId: 4,
    text: 'Question TypeScript 8',
    isDefault: true,
  },
  {
    id: 3,
    topicId: 5,
    text: 'Question JavaScript 9',
    isDefault: true,
  },
  {
    id: 4,
    topicId: 5,
    text: 'Question JavaScript 10',
    isDefault: true,
  },
];

export const topics: Topic[] = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Nest' },
  { id: 3, name: 'Node js' },
  { id: 4, name: 'TypeScript' },
  { id: 5, name: 'JavaScript' },
];
