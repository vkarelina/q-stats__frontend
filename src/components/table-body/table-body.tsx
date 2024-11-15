import useQuestion from '../../store/question';
import { TableRow } from '../table-row';

interface TableBodyProps {
  refreshQuestions: () => void;
}

const TableBody = ({ refreshQuestions }: TableBodyProps) => {
  const questions = useQuestion.use.questions();

  return (
    <tbody>
      {questions.map((question) => (
        <TableRow refreshQuestions={refreshQuestions} question={question} key={question.id}/>
      ))}
    </tbody>
  );
};

export default TableBody;
