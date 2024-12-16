export interface DropdownListItem {
  id: number;
  label: MenuList;
}

export type User = {
  id: number;
  name: string;
};

export type AnswerStatus = {
  id: number;
  status: boolean | null;
  userQuestionId: number;
  createdAt: string;
};

export type Answer = {
  date: string | Date;
  answers: AnswerStatus[];
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

export const enum MenuList {
  Edit = 1,
  Delete = 2,
}

export type QuestionTopic = Pick<Question, 'text'> & { topicId: number };

export type DtoUpdateUserQuestion = Pick<Question, 'id' & 'text'>;

export type UpdateAnswerStatusPayload = {
  status: boolean | null;
  date: Date;
  userQuestionId: number;
};
