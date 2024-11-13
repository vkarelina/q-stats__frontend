import cn from 'classnames';

import RightIcon from '../../assets/icons/right-icon.svg';
import WrongIcon from '../../assets/icons/wrong-icon.svg';
import useQuestion from '../../store/question';
import { Answer, Question, Topic, User } from '../../types';
import { getShortDate, parseDate } from '../../utils/date';

import styles from './answers-table.module.css';

interface AnswersTableProps {
  questions: Question[];
  user: Pick<User, 'id'>;
  topic: Pick<Topic, 'id'>;
  refreshQuestions?: () => void;
}

const AnswersTable = ({
  questions,
  user,
  topic,
  refreshQuestions,
}: AnswersTableProps) => {
  const fetchUpdateAnswerStatus = useQuestion.use.fetchUpdateAnswerStatus();

  const isAnswers = questions.some((q) => q.answers);

  const getUniqueDates = (questions: Question[]): string[] => {
    const dates = questions.flatMap((question) =>
      question.answers?.map((answer) => getShortDate(answer.createdAt)),
    );

    dates.push(getShortDate(new Date()));

    return Array.from(
      new Set(
        dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()),
      ),
    );
  };

  const uniqueDates =
    questions.length && questions[0].answers?.length
      ? getUniqueDates(questions)
      : [getShortDate(new Date())];

  const getCurrentStatus = (answers: Answer[], date: string) => {
    const foundAnswer = answers?.find(
      (answer) => getShortDate(answer.createdAt) === date,
    );

    return foundAnswer ? foundAnswer.response : null;
  };

  const handleButtonClick = (
    status: boolean,
    createdAt: Date,
    questionId: number,
  ) => {
    if (getShortDate(createdAt) !== getShortDate(new Date())) {
      return;
    }

    fetchUpdateAnswerStatus(
      status,
      createdAt,
      questionId,
      topic.id,
      user.id,
      isAnswers ? undefined : refreshQuestions,
    );
  };

  return (
    <div className={styles.table}>
      <table className={styles.tableElement}>
        <thead>
          <tr>
            {uniqueDates.map((date) => (
              <th className={styles.headerCell} key={date}>
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              {uniqueDates.map((date, index) => {
                const currentStatus = getCurrentStatus(question.answers, date);
                const foundAnswer = question.answers?.find(
                  (a) => getShortDate(a.createdAt) === date,
                );

                const createdAt = foundAnswer
                  ? new Date(foundAnswer.createdAt)
                  : parseDate(date);

                return (
                  <td
                    key={date}
                    className={
                      index < uniqueDates.length - 1
                        ? styles.cellWithBorder
                        : styles.cellWithoutBorder
                    }
                  >
                    <div className={styles.buttonContainer}>
                      <button
                        onClick={() =>
                          handleButtonClick(true, createdAt, question.id)
                        }
                        className={styles.button}
                      >
                        <RightIcon
                          className={cn(styles.icon, {
                            [styles.filledGreen]: currentStatus === true,
                            [styles.filledGray]: currentStatus !== true,
                          })}
                        />
                      </button>
                      <button
                        onClick={() =>
                          handleButtonClick(false, createdAt, question.id)
                        }
                        className={styles.button}
                      >
                        <WrongIcon
                          className={cn(styles.icon, {
                            [styles.filledRed]: currentStatus === false,
                            [styles.filledGray]: currentStatus !== false,
                          })}
                        />
                      </button>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnswersTable;
