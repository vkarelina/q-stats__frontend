import { TableBody } from '../table-body';
import { TableHead } from '../table-head';

import styles from './answers-table.module.css';

interface AnswersTableProps {
  refreshQuestions: () => void;
}

const AnswersTable = ({ refreshQuestions }: AnswersTableProps) => {
  return (
    <div className={styles.table}>
      <table className={styles.tableElement}>
        <TableHead />
        <TableBody refreshQuestions={refreshQuestions} />
      </table>
    </div>
  );
};

export default AnswersTable;
