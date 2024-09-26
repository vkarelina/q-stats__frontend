export interface User {
  id: number;
  name: string;
}

export interface Answer {
  id: number;
  questionId: number;
  userId: number;
  answer: boolean | null;
}

export interface Question {
  id: number;
  topicId: number;
  text: string;
}

export interface Topic {
  id: number;
  name: string;
}

export interface SessionRecord extends Question {
  result: boolean | null;
}
