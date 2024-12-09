import MenuVerticalIcon from '../../assets/icons/menu-vertical.svg';
import DropdownList from '../../components-ui/dropdown-list/dropdown-list';
import { dropdownList } from '../../constants';
import useAnswers from '../../store/answers';
import useUser from '../../store/user';
import { Question, Topic } from '../../types';
import { Answer } from '../answer';

import styles from './answers-table-row.module.css';

interface AnswersTableRowProps {
  question: Question;
  index: number;
  topic: Topic;
  refreshQuestions: () => void;
}

const AnswersTableRow = ({
  question,
  index,
  topic,
  refreshQuestions,
}: AnswersTableRowProps) => {
  const user = useUser.use.user();
  const answers = useAnswers.use.answers();

  const fetchAnswers = useAnswers.use.fetchAnswers();

  const sortedAnswers = answers.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-')).getTime();
    const dateB = new Date(b.date.split('-').reverse().join('-')).getTime();
    return dateA - dateB;
  });

  const handleAnswerButtonClick = (isCopiedQuestion: boolean) => {
    if (user && topic) {
      fetchAnswers(user, topic);
      if (isCopiedQuestion) {
        refreshQuestions();
      }
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.question}>
        <p>{`${index + 1}. ${question.text}`}</p>
          <DropdownList
            items={dropdownList}
            question={question}
            topic={topic}
            renderItem={(item) => <p>{item.label}</p>}
          >
            <MenuVerticalIcon />
          </DropdownList> 
      </td>
      {user && topic && (
        <td className={styles.answers}>
          {sortedAnswers.map((answer, index) => {
            return (
              <div className={styles.answer} key={`${index}-${question.id}`}>
                <Answer
                  key={answer.date}
                  createdAt={
                    new Date(answer.date.split('-').reverse().join('-'))
                  }
                  questionId={question.id}
                  currentStatus={answer.answers[question.id]?.status}
                  onClick={handleAnswerButtonClick}
                />
              </div>
            );
          })}
        </td>
      )}
    </tr>
  );
};

export default AnswersTableRow;
