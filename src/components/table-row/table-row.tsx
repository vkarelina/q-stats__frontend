import { AnswerContainer } from '../../components-ui/answer-container';
import useQuestion from '../../store/question';
import { Answer, Question } from '../../types';
import { getShortDate, parseDate } from '../../utils/date';

interface TableRowProps {
  question: Question;
  refreshQuestions?: () => void;
}

const TableRow = ({ question, refreshQuestions }: TableRowProps) => {
  const uniqueDates = useQuestion.use.uniqueDates();

  const getCurrentStatus = (answers: Answer[], date: string) => {
    const foundAnswer = answers?.find(
      (answer) => getShortDate(answer.createdAt) === date,
    );

    return foundAnswer ? foundAnswer.response : null;
  };

  return (
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
          <AnswerContainer
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

export default TableRow;
