import { useRef, useState } from 'react';

import useAnswer from '../../store/answers';
import useQuestion from '../../store/question';
import useUser from '../../store/user';
import { Question, SessionRecord } from '../../types';
import { QuestionItem } from '../question-item';

import styles from './question-list.module.css';

interface QuestionListProps {
  questions: Question[] | SessionRecord[] | null;
}

const QuestionList = ({ questions }: QuestionListProps) => {
  const [openForm, setOpenForm] = useState(false);
  const textQuestionRef = useRef<HTMLTextAreaElement>(null);

  const fetchAddAnswer = useAnswer.use.fetchAddAnswer();
  const fetchUpdateDefaultQuestion = useQuestion.use.fetchUpdateDefaultQuestion();

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

    fetchAddAnswer(user?.id, question.id);
    setOpenForm(false);
    textQuestionRef.current.value = '';
  };

  const handleUpdateQuestion = (text: string, question: Question) => {
    // редактируем дефолтный вопрос в теме юзера иначе редактируем либо вопрос из темы, либо кастомный
    if (user?.id && question.isDefault) {
      // const updateQuestion = {
      //   id: Date.now(),
      //   topicId: question.topicId,
      //   text: text,
      //   isDefault: false,
      // };

      // fetchUpdateDefaultUserQuestion(question.id, updateQuestion);
    } else {
      fetchUpdateDefaultQuestion(question.id, text);
    }
  };

  if (questions) {
    return (
      <ul className={styles.list}>
        {questions.map((question, idx) => (
          <QuestionItem
            question={question}
            key={question.id}
            idx={idx}
            handleUpdateQuestion={handleUpdateQuestion}
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
