import cn from 'classnames';
import { useRef, useState } from 'react';

import MenuVerticalIcon from '../../assets/icons/menu-vertical.svg';
import DropdownList from '../../components-ui/dropdown-list/dropdown-list';
import useAnswers from '../../store/answers';
import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import useUser from '../../store/user';
import { Question } from '../../types';
import { Answer } from '../answer';

import styles from './answers-table-row.module.css';

interface AnswersTableRowProps {
  question: Question;
  index: number;
  refreshQuestions: () => void;
}

const dropdownList = [
  { id: 1, label: 'Edit' },
  { id: 2, label: 'Delete' },
];

const enum MenuList {
  Edit = 1,
  Delete = 2,
}

const AnswersTableRow = ({
  question,
  index,
  refreshQuestions,
}: AnswersTableRowProps) => {
  const user = useUser.use.user();
  const topic = useTopic.use.topic();
  const answers = useAnswers.use.answers();

  const fetchAnswers = useAnswers.use.fetchAnswers();
  const fetchUpdateTopicQuestion = useQuestion.use.fetchUpdateTopicQuestion();

  const [isShowTextarea, setIsShowTextarea] = useState(false);
  const refText = useRef<HTMLTextAreaElement | null>(null);

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

  const getItem = (id: number) => {
    switch (id) {
      case MenuList.Edit:
        setIsShowTextarea(true);
        break;
      case MenuList.Delete:
        console.log(id);
        break;
      default:
        console.log(id);
    }
  };

  const handleUpdateText = (question: Question) => {
    if (!refText.current || refText.current.value === '') return;

    fetchUpdateTopicQuestion(
      { text: refText.current.value },
      question.id,
      topic?.id,
      refreshQuestions,
    );

    setIsShowTextarea(false);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.question}>
        <p className={cn({ [styles.close]: isShowTextarea })}>
          {`${index + 1}. ${question.text}`}
        </p>
        <textarea
          className={cn({ [styles.close]: !isShowTextarea })}
          defaultValue={question.text}
          onBlur={() => handleUpdateText(question)}
          ref={refText}
        />
        <DropdownList
          items={dropdownList}
          getItemList={getItem}
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
