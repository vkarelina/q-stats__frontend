export interface Questions {
  id: number;
  text: string;
  answer: boolean | null;
}

export interface Theme {
  name: string;
  questions: Questions[];
}

export interface User {
  id: number;
  name: string;
  themes: Theme[];
}
