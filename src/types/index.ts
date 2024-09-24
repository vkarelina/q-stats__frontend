export interface Questions {
  id: number;
  text: string;
  answer: boolean | null;
}

export interface Topic {
  id: number;
  name: string;
  questions: Questions[];
}

export interface User {
  id: number;
  name: string;
  topics: Topic[];
}
