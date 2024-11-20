import { useState } from 'react';

export const useSurvey = () => {
  const [questions, setQuestions] = useState([]);
  const [surveyData, setSurveyData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Function to add a question
  const handleAddQuestion = (newQuestion) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
  };

  // Function to edit a question
  const handleEditQuestion = (index, updatedQuestion) => {
    const updatedQuestions = questions.map((question, i) => 
      i === index ? updatedQuestion : question
    );
    setQuestions(updatedQuestions);
  };

  // Function to delete a question
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Function to convert questions to SurveyJS format and save
  const handleSaveSurvey = () => {
    const data = {
      elements: questions.map((question) => ({
        type: question.type,
        name: question.name,
        title: question.title,
        description: question.description,
        ...((question.type === "ranking" || question.type === "checkbox") && { choices: question.choices }),
      })),
    };
    
    // Store the survey data for previewing
    setSurveyData(data);
    console.log("SurveyJS Format:", JSON.stringify(data, null, 2));
  };

  // Toggle preview mode
  const handlePreviewSurvey = () => {
    if (surveyData) {
      setShowPreview(!showPreview);
    } else {
      alert('Please save the survey first!');
    }
  };

  return {
    questions,
    surveyData,
    showPreview,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveSurvey,
    handlePreviewSurvey,
    setShowPreview
  };
};
