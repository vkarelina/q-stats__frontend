import { Answer, Question, Topic, User } from "../types";

export const users: User[] = [
  {
    id: 1,
    name: "AUser One",
  },
  {
    id: 2,
    name: "BUser Two",
  },
  {
    id: 3,
    name: "CUser Three",
  },
];

export const answers: Answer[] = [
  {
    id: 4,
    questionId: 1,
    userId: 2,
    answer: true,
    date: new Date(1727382908935),
  },
  {
    id: 5,
    questionId: 1,
    userId: 2,
    answer: false,
    date: new Date(1727426615690),
  },
  {
    id: 4,
    questionId: 2,
    userId: 2,
    answer: null,
    date: new Date(1727382908935),
  },
  {
    id: 6,
    questionId: 3,
    userId: 2,
    answer: null,
    date: new Date(1727382908935),
  },
  {
    id: 7,
    questionId: 4,
    userId: 2,
    answer: null,
    date: new Date(1727426615690),
  },
];

export const questions: Question[] = [
  {
    id: 1,
    topicId: 1,
    text: "Question react 1",
  },
  {
    id: 2,
    topicId: 1,
    text: "Question react 2",
  },
  {
    id: 3,
    topicId: 2,
    text: "Question Nest 3",
  },
  {
    id: 4,
    topicId: 2,
    text: "Question Nest 4",
  },
  {
    id: 3,
    topicId: 3,
    text: "Question Node 5",
  },
  {
    id: 4,
    topicId: 3,
    text: "Question Node 6",
  },
  {
    id: 3,
    topicId: 4,
    text: "Question TypeScript 7",
  },
  {
    id: 4,
    topicId: 4,
    text: "Question TypeScript 8",
  },
  {
    id: 3,
    topicId: 5,
    text: "Question JavaScript 9",
  },
  {
    id: 4,
    topicId: 5,
    text: "Question JavaScript 10",
  },
];

export const topics: Topic[] = [
  { id: 1, name: "React" },
  { id: 2, name: "Nest" },
  { id: 3, name: "Node js" },
  { id: 4, name: "TypeScript" },
  { id: 5, name: "JavaScript" },
];
