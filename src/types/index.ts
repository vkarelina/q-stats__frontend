export type User = {
  id: number;
  name: string;
};

export type Question = {
  id: number;
  text: string;
  order: number;
};

export type Topic = {
  id: number;
  name: string;
};

export type QuestionTopic = Pick<Question, 'text'> & { topicId: number };
