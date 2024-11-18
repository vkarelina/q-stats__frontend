import useQuestion from '../../store/question';
import { Answer, Question } from '../../types';
import { getShortDate, parseDate } from '../../utils/date';
import { AnswerContainer } from '../answer-container';

interface AnswersTableRowProps {
  question: Question;
  refreshQuestions: () => void;
}

const AnswersTableRow = ({ question, refreshQuestions }: AnswersTableRowProps) => {
  const uniqueDates = useQuestion.use.uniqueDates();

  const getCurrentStatus = (answers: Answer[], date: string) => {
    const foundAnswer = answers?.find(
      (answer) => getShortDate(answer.createdAt) === date,
    );

    return foundAnswer ? foundAnswer.response : null;
  };

  return (
    <tr>
      {uniqueDates.map((date, index) => {
        const currentStatus = getCurrentStatus(question.answers, date);
        const foundAnswer = question.answers?.find(
          (a) => getShortDate(a.createdAt) === date,
        );

        const createdAt = foundAnswer
          ? new Date(foundAnswer.createdAt)
          : parseDate(date);

        return (
          <AnswerContainer
            key={date}
            date={date}
            index={index}
            createdAt={createdAt}
            questionId={question.id}
            currentStatus={currentStatus}
            refreshQuestions={refreshQuestions}
          />
        );
      })}
    </tr>
  );
};

export default AnswersTableRow;
