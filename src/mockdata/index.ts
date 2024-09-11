import { User } from "../types";

export const mockUserData: User[] = [
  {
    id: 1,
    name: "User One",
    themes: [
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
          { id: 3, text: "Question react 1", answer: null },
          { id: 4, text: "Question react 2", answer: null },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "User Two",
    themes: [
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
          { id: 3, text: "Question react 1", answer: null },
          { id: 4, text: "Question react 2", answer: null },
        ],
      },
    ],
  },
];

export const themesMock = ["React", "Nest", "Node js", "TypeScript", "JavaScript"];