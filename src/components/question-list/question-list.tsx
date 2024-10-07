import { useRef, useState } from 'react';

import useUser from '../../store/user';
import useQuestion from '../../store/question';
import useAnswer from '../../store/answers';

import { QuestionItem } from '../question-item';

import styles from './question-list.module.css';

const QuestionList = () => {
  const [openForm, setOpenForm] = useState(false);
  const textQuestionRef = useRef<HTMLTextAreaElement>(null);

  const fetchAddQuestion = useQuestion.use.fetchAddQuestion();
  const fetchAddAnswer = useAnswer.use.fetchAddAnswer();
  const fetchSession = useUser.use.fetchSession();

  const questions = useUser.use.session();
  const user = useUser.use.user();

  const handleAddQuestion = () => {
    if (!questions || !user?.id) return;

    if (!textQuestionRef.current?.value) {
      setOpenForm(false);
      return;
    }

    const question = {
      id: Date.now(),
      topicId: questions[0].topicId,
      text: textQuestionRef.current.value,
      isDefault: false,
    };

    fetchAddQuestion(question);
    fetchAddAnswer(user?.id, question.id);
    fetchSession(user?.id, question.topicId);
    setOpenForm(false);
    textQuestionRef.current.value = '';
  };

  if (questions) {
    return (
      <ul className={styles.list}>
        {questions.map((question, idx) => (
          <QuestionItem question={question} key={question.id} idx={idx} />
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
