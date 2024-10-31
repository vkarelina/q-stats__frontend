import { useRef } from 'react';

import useUser from '../../store/user';
import useTopic from '../../store/topic';
import { Question } from '../../types';
import { QuestionItem } from '../../components-ui/question-item';

import styles from './question-list.module.css';
import useQuestion from '../../store/question';

interface QuestionListProps {
  questions: Question[];
  refreshQuestions: () => void;
}

const QuestionList = ({ questions, refreshQuestions }: QuestionListProps) => {
  const textQuestionRef = useRef<HTMLTextAreaElement | any>('');

  const fetchCreateQuestion = useQuestion.use.fetchCreateQuestion();
  const fetchUpdateTopicQuestion = useQuestion.use.fetchUpdateTopicQuestion();

  const user = useUser.use.user();
  const topic = useTopic.use.topic();

  const handleAddQuestion = () => {
    const question = {
      text: textQuestionRef.current.value,
    };

    if (user && topic) fetchCreateQuestion(question, topic.id, user.id);
    else if (topic) fetchCreateQuestion(question, topic.id);

    textQuestionRef.current.value = '';
  };

  const handleUpdateQuestion = (text: string, questionId: number) => {
    const newText = { text };
    if (topic) fetchUpdateTopicQuestion(newText, questionId, topic.id, refreshQuestions);
  };

  if (questions) {
    return (
      <ul className={styles.list}>
        {topic && (
          <>
            {questions.map((question, idx) => (
              <QuestionItem
                question={question}
                key={question.id}
                idx={idx}
                handleUpdateQuestion={handleUpdateQuestion}
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
          </>
        )}
        {!topic && <li>Select topic and user</li>}
      </ul>
    );
  }
};

export default QuestionList;
