import api from './index';

export const fetchGetAnswers = (userId: number, topicId: number) =>
  api
    .get(`http://localhost:5000/answers/user/${userId}/topic/${topicId}`)
    .then((res) => res.data);
