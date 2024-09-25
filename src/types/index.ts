export interface Answer {
  id: number,
  data: string,
  answer: boolean | null;
}

export interface Questions {
  id: number;
  text: string;
  answers: Answer[] | [];
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
