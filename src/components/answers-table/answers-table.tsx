import { AnswersTableBody } from '../answers-table-body';
import { AnswersTableHead } from '../answers-table-head';

import styles from './answers-table.module.css';

interface AnswersTableProps {
  refreshQuestions: () => void;
}

const AnswersTable = ({ refreshQuestions }: AnswersTableProps) => {
  return (
    <div className={styles.table}>
      <table className={styles.tableElement}>
        <AnswersTableHead />
        <AnswersTableBody refreshQuestions={refreshQuestions} />
      </table>
    </div>
  );
};

export default AnswersTable;
