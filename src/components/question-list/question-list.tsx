import { useRef, useState } from 'react';

import useAnswer from '../../store/answers';
import useQuestion from '../../store/question';
import useUser from '../../store/user';
import { Question } from '../../types';
import { QuestionItem } from '../question-item';

import styles from './question-list.module.css';

const QuestionList = () => {
  const [openForm, setOpenForm] = useState(false);
  const textQuestionRef = useRef<HTMLTextAreaElement>(null);

  const fetchAddQuestion = useQuestion.use.fetchAddQuestion();
  const fetchAddAnswer = useAnswer.use.fetchAddAnswer();
  const fetchSession = useUser.use.fetchSession();
  const fetchUpdateSession = useUser.use.fetchUpdateSession();

  const sessionQuestion = useUser.use.session();
  const questions = useQuestion.use.questions();
  const user = useUser.use.user();

  const handleAddQuestion = () => {
    if (!sessionQuestion || !user?.id) return;

    if (!textQuestionRef.current?.value) {
      setOpenForm(false);
      return;
    }

    const question = {
      id: Date.now(),
      topicId: sessionQuestion[0].topicId,
      text: textQuestionRef.current.value,
      isDefault: false,
    };

    fetchAddQuestion(question);
    fetchAddAnswer(user?.id, question.id);
    fetchSession(user?.id, question.topicId);
    setOpenForm(false);
    textQuestionRef.current.value = '';
  };

  const handleUpdateQuestionn = (text: string, question: Question) => {
    const newQuestion = {
      id: Date.now(),
      topicId: question.topicId,
      text: text,
      isDefault: false,
    };

    if (!user) return;

    fetchAddQuestion(newQuestion);
    fetchAddAnswer(user.id, newQuestion.id);
    fetchUpdateSession(user.id, question.topicId, newQuestion, question.id);
  };

  if (sessionQuestion) {
    return (
      <ul className={styles.list}>
        {sessionQuestion.map((question, idx) => (
          <QuestionItem
            question={question}
            key={question.id}
            idx={idx}
            handleUpdateQuestion={handleUpdateQuestionn}
          />
        ))}
        {openForm && (
          <li>
            <p>{sessionQuestion.length + 1}</p>
            <textarea
              onBlur={handleAddQuestion}
              ref={textQuestionRef}
              autoFocus
              className={styles.textarea}
            />
          </li>
        )}
        <li onClick={() => setOpenForm(true)}>
          <p>+</p>
        </li>
      </ul>
    );
  }
  if (questions) {
    return (
      <ul className={styles.list}>
        {questions.map((question, idx) => (
          <QuestionItem
            question={question}
            key={question.id}
            idx={idx}
            handleUpdateQuestion={handleUpdateQuestionn}
          />
        ))}
        {openForm && (
          <li>
            <p>{questions.length + 1}</p>
            <textarea
              onBlur={handleAddQuestion}
              ref={textQuestionRef}
              autoFocus
              className={styles.textarea}
            />
          </li>
        )}
        <li onClick={() => setOpenForm(true)}>
          <p>+</p>
        </li>
      </ul>
    );
  }
};

export default QuestionList;
