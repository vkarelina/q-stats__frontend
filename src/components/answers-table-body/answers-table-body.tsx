import useQuestion from '../../store/question';
import { AnswersTableRow } from '../answers-table-row';

interface AnswersTableBodyProps {
  refreshQuestions: () => void;
}

const AnswersTableBody = ({ refreshQuestions }: AnswersTableBodyProps) => {
  const questions = useQuestion.use.questions();

  return (
    <tbody>
      {questions.map((question) => (
        <AnswersTableRow refreshQuestions={refreshQuestions} question={question} key={question.id}/>
      ))}
    </tbody>
  );
};

export default AnswersTableBody;
