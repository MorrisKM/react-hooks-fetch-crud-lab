import React,{useState} from "react";

function QuestionItem({ question, handleDelete, handleUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  let initialAnswer = question.answers[correctIndex]
  const [answer, setAnswer] = useState(initialAnswer)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleChange = (e) => {
    setAnswer(e.target.value)
    handleUpdate(question.id, answer)
  }
  const onDelete = () => {
    handleDelete(id)
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={answer}>{options}</select>
      </label>
      <button onClick={onDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
