export type User = {
  id: number;
  name: string;
}

export type Answer = {
  id: number;
  questionId: number;
  userId: number;
  answer: boolean | null;
  date: Date;
}

export type Question = {
  id: number;
  topicId: number;
  text: string;
}

export type Topic = {
  id: number;
  name: string;
}

export type SessionRecord = Question & { answers: Pick<Answer, 'date' | 'id' | 'answer'>[]}
