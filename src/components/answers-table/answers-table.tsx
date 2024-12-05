import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import { AnswersTableBody } from '../answers-table-body';
import { AnswersTableHead } from '../answers-table-head';

import styles from './answers-table.module.css';

interface AnswersTableProps {
  refreshQuestions: () => void;
}

const AnswersTable = ({ refreshQuestions }: AnswersTableProps) => {
  const questions = useQuestion.use.questions();
  const topic = useTopic.use.topic();

  if (!questions || !topic) return <div className={styles.prompt}>Select topic and user</div>;

  return (
    <table className={styles.table}>
      <AnswersTableHead />
      <AnswersTableBody refreshQuestions={refreshQuestions} />
    </table>
  );
};

export default AnswersTable;
