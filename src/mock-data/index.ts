import { Topic, User } from "../types";

export const mockUserData: User[] = [
  {
    id: 1,
    name: "User One",
    topics: [
      {
        name: "Nest",
        questions: [
          { id: 3, text: "Question Nest 1", answer: null },
          { id: 4, text: "Question Nest 2", answer: null },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "User Two",
    topics: [
      {
        name: "React",
        questions: [
          { id: 1, text: "Question react 1", answer: null },
          { id: 2, text: "Question react 2", answer: null },
        ],
      },
      {
        name: "Nest",
        questions: [
          { id: 3, text: "Question Nest 1", answer: null },
          { id: 4, text: "Question Nest 2", answer: null },
        ],
      },
    ],
  },
];

export const mockTopics: Topic[] = [
  {
    name: "React",
    questions: [
      { id: 1, text: "Какие хуки чаще всего используешь в реакте? знаком с хуком useContext? F useLayoutEffect, IntersectionEffect? на какие три типа хуки классифицируются?", answer: null },
      { id: 2, text: "Что ты знаешь об оптимизации реакта в виртуальном доме и файберах?", answer: null },
      { id: 3, text: "Есть ли любимые хуки?", answer: null },
    ],
  },
  {
    name: "Nest",
    questions: [
      { id: 1, text: "Nest 1", answer: null },
      { id: 2, text: "Nest 2", answer: null },
    ],
  },
  {
    name: "Node js",
    questions: [
      { id: 1, text: "Node js 1", answer: null },
      { id: 2, text: "Node js 2", answer: null },
    ],
  },
  {
    name: "TypeScript",
    questions: [
      { id: 1, text: "Какие виды протекторов в TS ты знаешь  (в том числе в классах, private, public, protected)?", answer: null },
      { id: 2, text: "TypeScript 2", answer: null },
    ],
  },
  {
    name: "JavaScript",
    questions: [
      { id: 1, text: "Благодаря чему язык Java Script асинхронный?", answer: null },
      { id: 2, text: "Расскажи подробнее про Event loop и call stack (рассказать микро и макрозадачи)", answer: null },
      { id: 3, text: "Что происходит после того, как call stack полностью опустел?", answer: null },
    ],
  },
];
