import { useState } from 'react';
import QuestionForm from './Question-Form';

function SurveyBuilder({ onAddQuestion }) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");

  const addQuestion = () => {
    const newQuestion = {
      name: `question${Date.now()}`,
      type: questionType,
      title: questionTitle,
      description: questionDescription,
      ...((questionType === "ranking" || questionType === "checkbox") && { choices })
    };

    onAddQuestion(newQuestion);

    setQuestionTitle("");
    setQuestionDescription("");
    setChoices([]);
  };

  const addChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices, newChoice.trim()]);
      setNewChoice("");
    }
  };

  return (
    <div className="survey-builder">
      <QuestionForm
        questionType={questionType}
        setQuestionType={setQuestionType}
        questionTitle={questionTitle}
        setQuestionTitle={setQuestionTitle}
        questionDescription={questionDescription}
        setQuestionDescription={setQuestionDescription}
        choices={choices}
        newChoice={newChoice}
        setNewChoice={setNewChoice}
        addChoice={addChoice}
      />
      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
}

export default SurveyBuilder;
