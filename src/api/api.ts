import { answers, questions, topics, users } from "../mock-data";
import { Question } from "../types";

export const fetchUsers = () => {
  return users;
};

export const fetchAnswers = () => {
  return answers;
};

export const fetchQuestions = () => {
  return questions;
};

export const fetchTopics = () => {
  return topics;
};

export const fetchQuestionById = (questionId: number) => {
  const questions = fetchQuestions();
  return questions.find((question) => question.id === questionId);
};

export const fetchTopicById = (topicId: number) => {
  const topics = fetchTopics();
  return topics.find((topic) => topic.id === topicId);
};

export const fetchUserAnswers = (userId: number) => {
  const answers = fetchAnswers();
  return answers.filter((answer) => answer.userId === userId);
};

export const fetchSession = (userId: number, topicId: number) => {
  const questions = fetchQuestions();
  const topicQuestions = questions.filter(
    (question) => question.topicId === topicId
  );

  const userAnswers = fetchUserAnswers(userId);

  const sessionQuestions = topicQuestions.filter((question) =>
    userAnswers.filter((answer) => answer.questionId === question.id)
  );

  const session = sessionQuestions.map(question => {
    const answers = userAnswers
    .filter(answer => answer.questionId === question.id)
    .map(({ date, answer, id }) => ({ date, answer, id }));
    
    return {
    ...question,
    answers,
  }})

  console.log(session)

  return session;
};

// добавление вопроса
export const fetchAddQuestion = (question: Question) => {
  const questions = fetchQuestions();
  questions.push(question);

  return question;
}

export const fetchAddAnswer = (userId: number, questionId: number) => {
  const answers = fetchAnswers();

  const answer = {
    id: answers.length + 2,
    questionId,
    userId,
    answer: null,
    date: new Date(),
  }

  answers.push(answer);

  return answer;
}
