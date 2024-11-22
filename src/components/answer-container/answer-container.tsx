import cn from 'classnames';

import CorrectIcon from '../../assets/icons/correct-icon.svg';
import WrongIcon from '../../assets/icons/wrong-icon.svg';
import useAnswers from '../../store/answers';
import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import useUser from '../../store/user';
import { formatDate, getShortDate } from '../../utils/date';

import styles from './answer-container.module.css';


interface AnswerContainerProps {
  date: string;
  index: number;
  createdAt: Date;
  questionId: number;
  currentStatus: boolean | null;
  refreshQuestions: () => void;
}

const AnswerContainer = ({
  date,
  index,
  createdAt,
  questionId,
  currentStatus,
  refreshQuestions,
}: AnswerContainerProps) => {
  const uniqueDates = useQuestion.use.uniqueDates();

  const fetchUpdateAnswerStatus = useAnswers.use.fetchUpdateAnswerStatus();
  const user = useUser.use.user();
  const topic = useTopic.use.topic();
  
  const handleButtonClick = (
    status: boolean,
    createdAt: Date,
    questionId: number,
  ) => {

    if (formatDate(createdAt) !== formatDate(new Date())) return;
    if (user?.id && topic?.id) {
      fetchUpdateAnswerStatus({
        status,
        date: createdAt,
        userQuestionId: questionId,
        topicId: topic.id,
        userId: user.id,
      });

      refreshQuestions();
    }
  };

  return (
    <td
      key={date}
      className={cn({
        [styles.cellWithBorder]: index < uniqueDates.length - 1,
        [styles.cellWithoutBorder]: index >= uniqueDates.length - 1,
      })}
    >
      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleButtonClick(true, createdAt, questionId)}
          className={styles.button}
        >
          <CorrectIcon
            className={cn(styles.icon, {
              [styles.filledGreen]: currentStatus,
              [styles.filledGray]: !currentStatus,
            })}
          />
        </button>
        <button
          onClick={() => handleButtonClick(false, createdAt, questionId)}
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
};

export default AnswerContainer;
