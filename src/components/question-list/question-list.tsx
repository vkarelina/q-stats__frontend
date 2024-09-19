import "./question-list.css";

const questionList = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Questions</th>
          <th scope="col">Answers</th>
        </tr>
      </thead>
      <tbody>
        {arr.map((_, idx) => (
          <tr key={idx}>
            <td scope="row">
              <ul className="wrapper-list">
                <li>
                  Text text text texttext text text text text text text text
                  text text text text questions
                </li>
              </ul>
            </td>
            <td>
              <ul className="wrapper-list">
                <li>
                  <input type="checkbox"></input>
                </li>
              </ul>
            </td>
            <td>
              <ul className="wrapper-list">
                <li>12.09.2024</li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default questionList;
