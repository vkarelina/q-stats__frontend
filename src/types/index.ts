export type User = {
  id: number;
  name: string;
};

export type Answer = {
  id: number;
  response: boolean;
  createdAt: string;
};

export type Question = {
  id: number;
  text: string;
  order: number;
  answers: Answer[];
};

export type Topic = {
  id: number;
  name: string;
};

export type QuestionTopic = Pick<Question, 'text'> & { topicId: number };

export type AnswerStatus = {
  response: boolean | null;
  date: Date;
  userQuestionId: number;
};
