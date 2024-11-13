import { memo, useCallback, useRef } from 'react';

import { ListItem as ListItemMemo } from '../../components-ui/list-item';
import useQuestion from '../../store/question';
import useTopic from '../../store/topic';
import useUser from '../../store/user';
import { Question } from '../../types';

import styles from './question-list.module.css';

const ListItem = memo(ListItemMemo);

interface QuestionListProps {
  questions: Question[];
  refreshQuestions: () => void;
}

const QuestionList = ({ questions, refreshQuestions }: QuestionListProps) => {
  const textQuestionRef = useRef<HTMLTextAreaElement | null>(null);

  const fetchCreateQuestion = useQuestion.use.fetchCreateQuestion();
  const fetchUpdateTopicQuestion = useQuestion.use.fetchUpdateTopicQuestion();

  const user = useUser.use.user();
  const topic = useTopic.use.topic();

  const handleAddQuestion = () => {
    if (!textQuestionRef.current) return;

    const question = {
      text: textQuestionRef.current.value,
    };

    if (user && topic) fetchCreateQuestion(question, topic.id, user.id);
    else if (topic) fetchCreateQuestion(question, topic.id);

    textQuestionRef.current.value = '';
  };

  const handleUpdateQuestion = useCallback(
    (text: string, questionId: number) => {
      const newText = { text };
      if (topic)
        fetchUpdateTopicQuestion(
          newText,
          questionId,
          topic.id,
          refreshQuestions,
        );
    },
    [topic],
  );

  if (!questions || !topic) return <div>Select topic and user</div>;

  return (
    <ul className={styles.list}>
      {questions.map((question, idx) => (
        <ListItem
          item={question}
          key={question.id}
          idx={idx}
          handleUpdateItem={handleUpdateQuestion}
        />
      ))}
      <li>
        <textarea
          onBlur={handleAddQuestion}
          ref={textQuestionRef}
          className={styles.textarea}
          placeholder="Create new question"
        />
      </li>
    </ul>
  );
};

export default memo(QuestionList);
