import { useRef } from 'react';

import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import useUser from '../../store/user';
import { AnswersTableRow } from '../answers-table-row';

import styles from './answers-table-body.module.css';

interface AnswersTableBodyProps {
  refreshQuestions: () => void;
}

const AnswersTableBody = ({ refreshQuestions }: AnswersTableBodyProps) => {
  const textQuestionRef = useRef<HTMLTextAreaElement | null>(null);

  const questions = useQuestion.use.questions();
  const user = useUser.use.user();
  const topic = useTopic.use.topic();

  const createQuestion = useQuestion.use.createQuestion();

  const handleAddQuestion = () => {
    if (!textQuestionRef.current) return;

    const question = {
      text: textQuestionRef.current.value,
    };

    if (user && topic) createQuestion(question, topic.id, user.id);
    else if (topic) createQuestion(question, topic.id);

    textQuestionRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleAddQuestion();
    }
  };

  return (
    <tbody>
      {topic && questions.map((question, index) => (
        <AnswersTableRow
          key={question.id}
          index={index}
          question={question}
          topic={topic}
          refreshQuestions={refreshQuestions}
        />
      ))}
      <tr>
        <td>
          <textarea
            onKeyDown={handleKeyDown}
            onBlur={handleAddQuestion}
            ref={textQuestionRef}
            className={styles.textarea}
            placeholder="Create new question"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default AnswersTableBody;
