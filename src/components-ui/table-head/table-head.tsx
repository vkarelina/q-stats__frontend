import useQuestion from '../../store/question';

import styles from './table-head.module.css';

const TableHead = () => {
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

export default TableHead;
