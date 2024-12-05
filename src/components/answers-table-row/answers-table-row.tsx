import useAnswers from '../../store/answers';
import useTopic from '../../store/topic';
import useUser from '../../store/user';
import { Question } from '../../types';
import { Answer } from '../answer';

import styles from './answers-table-row.module.css';

interface AnswersTableRowProps {
  question: Question;
  index: number;
  refreshQuestions: () => void;
}

const AnswersTableRow = ({
  question,
  index,
  refreshQuestions,
}: AnswersTableRowProps) => {
  const user = useUser.use.user();
  const topic = useTopic.use.topic();
  const answers = useAnswers.use.answers();

  const fetchAnswers = useAnswers.use.fetchAnswers();

  const sortedAnswers = answers.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-')).getTime();
    const dateB = new Date(b.date.split('-').reverse().join('-')).getTime();
    return dateA - dateB;
  });

  const handleAnswerButtonClick = (isCopiedQuestion: boolean) => {
    if (user && topic) {
      fetchAnswers(user, topic);
      if (isCopiedQuestion) {
        refreshQuestions();
      }
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.question}>{`${index + 1}. ${question.text}`}</td>
      {user && topic && (
        <td className={styles.answers}>
          {sortedAnswers.map((answer, index) => {
            return (
              <div className={styles.answer} key={`${index}-${question.id}`}>
                <Answer
                  key={answer.date}
                  createdAt={new Date(answer.date.split('-').reverse().join('-'))}
                  questionId={question.id}
                  currentStatus={answer.answers[question.id]?.status}
                  onClick={handleAnswerButtonClick}
                />
              </div>
            );
          })}
        </td>
      )}
    </tr>
  );
};

export default AnswersTableRow;
