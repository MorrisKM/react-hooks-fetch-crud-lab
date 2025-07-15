import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])

  const handleDelete = (id) => {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
      .then(r => r.json())
      .then(() => {
        let updatedList = questions.filter(question => question.id !== id);
        setQuestions(updatedList)
      })
  }

  const handleUpdate = (id, answer) => {
    questions.map(question => {
      if(question.id === id) {
        let arr = question.answers
        let correctIndexN = arr.indexOf(answer)
        setQuestions([...questions, {...question, correctIndex : correctIndexN}])
          fetch(`http://localhost:4000/questions/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({correctIndex : correctIndexN})
        })
      }
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => (
       <QuestionItem key={question.prompt} question = {question} handleDelete = {handleDelete} handleUpdate={handleUpdate}/>
      ))}</ul>
    </section>
  );
}

export default QuestionList;
