import { useState } from 'react';
import './App.css';
import SurveyBuilder from './Survey-Builder';
import QuestionList from './Question-List';
import { useSurvey } from './UseSurvey';

function App() {
  const {
    questions,
    surveyData,
    showPreview,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveSurvey,
    handlePreviewSurvey
  } = useSurvey();  // Destructure the state and functions from the hook

  return (
    <div>
      <SurveyBuilder onAddQuestion={handleAddQuestion} />
      <QuestionList 
        questions={questions} 
        onEditQuestion={handleEditQuestion}
        onDeleteQuestion={handleDeleteQuestion}
      />
      <button onClick={handleSaveSurvey}>Save Survey</button>
      <button onClick={handlePreviewSurvey}>Preview Survey</button>

      {showPreview && surveyData && (
        <SurveyPreview surveyData={surveyData} />
      )}
    </div>
  );
}

export default App;