import { useState } from 'react';
import QuestionForm from './Question-Form';

function SurveyBuilder({ onAddQuestion }) {
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    type: 'text',
    choices: [],
    newChoice: '',
  });

  const handleFieldChange = (field, value) => {
    setQuestionData((prev) => ({ ...prev, [field]: value }));
  };

  const addChoice = () => {
    const { newChoice, choices } = questionData;
    if (newChoice.trim()) {
      setQuestionData({
        ...questionData,
        choices: [...choices, newChoice.trim()],
        newChoice: '',
      });
    }
  };

  const deleteChoice = (index) => {
    setQuestionData((prev) => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index),
    }));
  };

  const addQuestion = () => {
    const { type, title, description, choices } = questionData;
    const newQuestion = {
      name: `question${Date.now()}`,
      type,
      title,
      description,
      ...(type === 'ranking' || type === 'checkbox' ? { choices } : {}),
    };
    onAddQuestion(newQuestion);
    setQuestionData({
      title: '',
      description: '',
      type: 'text',
      choices: [],
      newChoice: '',
    });
  };

  return (
    <div className="survey-builder">
      <QuestionForm
        questionType={questionData.type}
        setQuestionType={(type) => handleFieldChange('type', type)}
        questionTitle={questionData.title}
        setQuestionTitle={(title) => handleFieldChange('title', title)}
        questionDescription={questionData.description}
        setQuestionDescription={(desc) => handleFieldChange('description', desc)}
        choices={questionData.choices}
        newChoice={questionData.newChoice}
        setNewChoice={(choice) => handleFieldChange('newChoice', choice)}
        addChoice={addChoice}
        deleteChoice={deleteChoice}
      />
      <button onClick={addQuestion}>Add Question</button>
    </div>
  );
}

export default SurveyBuilder;
