import cn from 'classnames';

import CorrectIcon from '../../assets/icons/correct-icon.svg';
import WrongIcon from '../../assets/icons/wrong-icon.svg';
import { formatDate } from '../../helpers/formatDate';
import useAnswers from '../../store/answers';
import useTopic from '../../store/topic';
import useUser from '../../store/user';

import styles from './answer.module.css';

interface AnswerProps {
  createdAt: Date;
  questionId: number;
  currentStatus: boolean | null;
  onClick: (isCopiedQuestion: boolean) => void;
}

const Answer = ({
  createdAt,
  questionId,
  currentStatus,
  onClick,
}: AnswerProps) => {
  const user = useUser.use.user();
  const topic = useTopic.use.topic();

  const fetchUpdateAnswerStatus = useAnswers.use.fetchUpdateAnswerStatus();

  const handleButtonClick = (status: boolean) => {
    if (formatDate(createdAt) !== formatDate(new Date())) return;

    if (user?.id && topic?.id) {
      fetchUpdateAnswerStatus({
        status,
        date: createdAt,
        userQuestionId: questionId,
        topicId: topic.id,
        userId: user.id,
      }).then((res) => onClick(res.isCopiedQuestion));
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button onClick={() => handleButtonClick(true)} className={styles.button}>
        <CorrectIcon
          className={cn(styles.icon, {
            [styles.filledGreen]: currentStatus,
            [styles.filledGray]: !currentStatus,
          })}
        />
      </button>
      <button
        onClick={() => handleButtonClick(false)}
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
  );
};

export default Answer;
