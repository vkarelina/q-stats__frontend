import { Answer, Question, Topic, User } from "../types";

export const users: User[] = [
  {
      id: 1,
      name: "AUser One",
  },{
      id: 2,
      name: "BUser Two",
  },{
      id: 3,
      name: "CUser Three",
  }
];

export const answers: Answer[] = [
  {
      id: 1,
      questionId: 3,
      userId: 1,
      answer: null
  },{
      id: 2,
      questionId: 4,
      userId: 1,
      answer: null
  },{
      id: 3,
      questionId: 1,
      userId: 2,
      answer: null
  },{
      id: 4,
      questionId: 2,
      userId: 2,
      answer: null
  },{
      id: 5,
      questionId: 3,
      userId: 2,
      answer: null
  },{
      id: 6,
      questionId: 4,
      userId: 2,
      answer: null
  }
];

export const questions: Question[] = [
  {
      id: 1,
      topicId: 1,
      text: "Question react 1"
  },
  {
      id: 2,
      topicId: 1,
      text: "Question react 2"
  },
  {
      id: 3,
      topicId: 2,
      text: "Question Nest 3"
  },
  {
      id: 4,
      topicId: 2,
      text: "Question Nest 4"
  }
];

export const topics: Topic[] = [
  { id: 1, name: "React" },
  { id: 2, name: "Nest" },
  { id: 3, name: "Node js" },
  { id: 4, name: "TypeScript" },
  { id: 5, name: "JavaScript" }
];