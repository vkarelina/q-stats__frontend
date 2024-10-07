import { answers, questions, topics, users } from '../mock-data';
import { Question } from '../types';

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

export const fetchSession = (userId: number, topicId: number) => {
  const questions = fetchQuestions();

  const topicQuestions = questions.filter(
    (question) => question.topicId === topicId,
  );

  const userAnswers = fetchUserAnswers(userId);

  let sessionQuestions = topicQuestions.filter((question) =>
    userAnswers.some((answer) => answer.questionId === question.id),
  );

  if (sessionQuestions.length === 0) {
    sessionQuestions = topicQuestions.filter((question) => question.isDefault);
    sessionQuestions.map((question) => fetchAddAnswer(userId, question.id));
  }

  const session = sessionQuestions.map((question) => {
    const answers = userAnswers
      .filter((answer) => answer.questionId === question.id)
      .map(({ date, answer, id }) => ({ date, answer, id }));

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

export const fetchUpdateSession = (
  userId: number,
  topicId: number,
  newQuestion: Question,
  oldQuestionId: number,
) => {
  const currentSession = fetchSession(userId, topicId);

  const newSession = currentSession.filter((question) => {
    if (question.id !== oldQuestionId) {
      return question;
    } else {
      question.id = newQuestion.id;
      question.text = newQuestion.text;
      question.isDefault = newQuestion.isDefault;

      return question;
    }
  });

  newSession.pop();

  return newSession;
};
