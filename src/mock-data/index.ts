import { Topic, User } from "../types";

export const mockUserData: User[] = [
  {
    id: 1,
    name: "User One",
    topics: [
      {
        id: 2,
        name: "Nest",
        questions: [
          {
            id: 3,
            text: "Question Nest 1",
            answers: [
              { id: 1, data: "12.09.2024", answer: false },
              { id: 2, data: "13.09.2024", answer: true },
            ],
          },
          {
            id: 4,
            text: "Question Nest 2",
            answers: [
              { id: 1, data: "12.09.2024", answer: null },
              { id: 2, data: "13.09.2024", answer: true },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "User Two",
    topics: [
      {
        id: 1,
        name: "React",
        questions: [
          {
            id: 1,
            text: "Question react 1",
            answers: [
              { id: 1, data: "12.09.2024", answer: null },
              { id: 2, data: "13.09.2024", answer: null },
            ],
          },
          {
            id: 2,
            text: "Question react 2",
            answers: [
              { id: 1, data: "12.09.2024", answer: null },
              { id: 2, data: "13.09.2024", answer: null },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Nest",
        questions: [
          {
            id: 3,
            text: "Question Nest 1",
            answers: [
              { id: 1, data: "12.09.2024", answer: null },
              { id: 2, data: "13.09.2024", answer: null },
            ],
          },
          {
            id: 4,
            text: "Question Nest 2",
            answers: [
              { id: 1, data: "12.09.2024", answer: null },
              { id: 2, data: "13.09.2024", answer: null },
            ],
          },
        ],
      },
    ],
  },
];

export const mockTopics: Topic[] = [
  {
    id: 1,
    name: "React",
    questions: [
      {
        id: 1,
        text: "Какие хуки чаще всего используешь в реакте? знаком с хуком useContext? F useLayoutEffect, IntersectionEffect? на какие три типа хуки классифицируются?",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
      {
        id: 2,
        text: "Что ты знаешь об оптимизации реакта в виртуальном доме и файберах?",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
      {
        id: 3,
        text: "Есть ли любимые хуки?",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Nest",
    questions: [
      {
        id: 1,
        text: "Nest 1",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
      {
        id: 2,
        text: "Nest 2",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Node js",
    questions: [
      {
        id: 1,
        text: "Node js 1",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
      {
        id: 2,
        text: "Node js 2",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "TypeScript",
    questions: [
      {
        id: 1,
        text: "Какие виды протекторов в TS ты знаешь  (в том числе в классах, private, public, protected)?",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
      {
        id: 2,
        text: "TypeScript 2",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "JavaScript",
    questions: [
      {
        id: 1,
        text: "Благодаря чему язык Java Script асинхронный?",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
      {
        id: 2,
        text: "Расскажи подробнее про Event loop и call stack (рассказать микро и макрозадачи)",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
      {
        id: 3,
        text: "Что происходит после того, как call stack полностью опустел?",
        answers: [
          { id: 1, data: "12.09.2024", answer: null },
          { id: 2, data: "13.09.2024", answer: null },
        ],
      },
    ],
  },
];
