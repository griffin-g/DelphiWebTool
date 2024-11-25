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

  const saveSurveyToDatabase = async ({ surveyID, surveyJSON }) => {
    const response = await fetch('/api/save-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        surveyID,
        surveyJSON,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to save survey');
    }
  };
  
  const handleSaveSurvey = async () => {
    const surveyData = {
      elements: questions.map((question) => ({
        type: question.type,
        name: question.name,
        title: question.title,
        description: question.description,
        ...((question.type === "ranking" || question.type === "checkbox") && { choices: question.choices }),
      })),
    };

    setSurveyData(surveyData);
    console.log("SurveyJS Format:", JSON.stringify(surveyData, null, 2));

    try {
      await saveSurveyToDatabase({
        surveyID: 0,
        surveyJSON: surveyData,
      });
      console.log('Survey saved successfully!');
    } catch (error) {
      console.error('Error saving survey:', error);
    }
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
