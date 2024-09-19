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
      { id: 1, text: "React 1", answer: null },
      { id: 2, text: "React 2", answer: null },
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
      { id: 1, text: "TypeScript 1", answer: null },
      { id: 2, text: "TypeScript 2", answer: null },
    ],
  },
  {
    name: "JavaScript",
    questions: [
      { id: 1, text: "JavaScript 1", answer: null },
      { id: 2, text: "JavaScript 2", answer: null },
    ],
  },
];
