import { answers, questions, topics, users } from '../mock-data';
import { Answer, Question } from '../types';

export const fetchUsers = () => users;

export const fetchAnswers = () => answers;

export const fetchQuestions = () => questions;

export const fetchTopics = () => topics;

export const fetchQuestionById = (id: number) => {
  const questions = fetchQuestions();
  return questions.find((question) => question.id === id);
};

export const fetchTopicById = (id: number) => {
  const topics = fetchTopics();
  return topics.find((topic) => topic.id === id);
};

export const fetchUserAnswers = (userId: number) => {
  const answers = fetchAnswers();
  return answers.filter((answer) => answer.userId === userId);
};

export const fetchQuestionByTopic = (topicId: number) => {
  const questions = fetchQuestions();
  return questions.filter(
    (question) => question.topicId === topicId && question.isDefault,
  );
};

export const fetchSession = (
  questions: Question[] | null,
  userId: number,
  topicId: number,
) => {
  const allQuestion = fetchQuestions();
  if (!questions) return;

  const topicQuestions = allQuestion.filter(
    (question) => question.topicId === topicId,
  );

  const userAnswers = fetchUserAnswers(userId);

  const sessionQuestions = topicQuestions.filter((question) =>
    userAnswers.some((answer) => answer.questionId === question.id),
  );

  const updatedSessionQuestions = sessionQuestions.map((session) => {
    const matchingQuestion = questions.find(
      (question) => session.id === question.id,
    );

    return matchingQuestion || session;
  });

  const session = updatedSessionQuestions.map((question) => {
    const answers = userAnswers.reduce<Pick<Answer, 'date' | 'answer' | 'id'>[]>(
      (acc, userAnswer) => {
        const { questionId, date, answer, id } = userAnswer;
        if (questionId === question.id) acc.push({ date, answer, id });

        return acc;
      },
      [],
    );

    return {
      ...question,
      answers,
    };
  });

  return session;
};

export const fetchAddQuestion = (question: Question) => {
  const questions = fetchQuestions();
  questions.push(question);

  return question;
};

export const fetchAddAnswer = (userId: number, questionId: number) => {
  const answers = fetchAnswers();

  const answer = {
    id: answers.length + 1,
    questionId,
    userId,
    answer: null,
    date: new Date(),
  };

  answers.push(answer);

  return answer;
};
