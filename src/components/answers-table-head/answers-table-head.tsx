import useAnswers from '../../store/answers';
import useUser from '../../store/user';

import styles from './answers-table-head.module.css'

const AnswersTableHead = () => {
  const user = useUser.use.user();
  const answers = useAnswers.use.answers();

  return (
    <thead>
      <tr className={styles.headerRow}>
        <th className={styles.questionHeader}></th>
        {user && (
          <th className={styles.answerHeaders}>
            {answers.map((a) => (
              <div key={a.date} className={styles.answerHeader}>
                {a.date}
              </div>
            ))}
          </th>
        )}
      </tr>
    </thead>
  );
};

export default AnswersTableHead;
