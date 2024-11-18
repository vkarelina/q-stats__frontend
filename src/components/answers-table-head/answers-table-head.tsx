import useQuestion from '../../store/question';

import styles from './answers-table-head.module.css';

const AnswersTableHead = () => {
  const uniqueDates = useQuestion.use.uniqueDates();

  return (
    <thead>
      <tr>
        {uniqueDates.map((date) => (
          <th className={styles.headerCell} key={date}>
            {date}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default AnswersTableHead;
