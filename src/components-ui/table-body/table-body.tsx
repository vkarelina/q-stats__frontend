import { TableRow } from '../../components/table-row';
import useQuestion from '../../store/question';

interface TableBodyProps {
  refreshQuestions: () => void;
}

const TableBody = ({ refreshQuestions }: TableBodyProps) => {
  const questions = useQuestion.use.questions();

  return (
    <tbody>
      {questions.map((question) => (
        <TableRow refreshQuestions={refreshQuestions} question={question} />
      ))}
    </tbody>
  );
};

export default TableBody;
