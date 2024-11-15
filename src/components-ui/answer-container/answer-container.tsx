import cn from 'classnames';

import RightIcon from '../../assets/icons/right-icon.svg';
import WrongIcon from '../../assets/icons/wrong-icon.svg';
import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import useUser from '../../store/user';
import { getShortDate } from '../../utils/date';

import styles from './answer-container.module.css';

interface AnswerContainerProps {
  date: string;
  index: number;
  createdAt: Date;
  questionId: number;
  currentStatus: boolean | null;
  refreshQuestions?: () => void;
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

  const fetchUpdateAnswerStatus = useQuestion.use.fetchUpdateAnswerStatus();
  const questions = useQuestion.use.questions();
  const user = useUser.use.user();
  const topic = useTopic.use.topic();

  const isAnswers = questions.some((q) => q.answers);

  const handleButtonClick = (
    status: boolean,
    createdAt: Date,
    questionId: number,
  ) => {
    if (getShortDate(createdAt) !== getShortDate(new Date())) return;
    if (user?.id && topic?.id) {
      const params = {
        status,
        date: createdAt,
        userQuestionId: questionId,
        topicId: topic.id,
        userId: user.id,
        refreshQuestions: isAnswers ? undefined : refreshQuestions,
      };

      fetchUpdateAnswerStatus(params);
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
          <RightIcon
            className={cn(styles.icon, {
              [styles.filledGreen]: currentStatus === true,
              [styles.filledGray]: currentStatus !== true,
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
