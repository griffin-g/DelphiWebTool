import './App.css';
import SurveyBuilder from './SurveyBuilder';
import QuestionList from './QuestionList';
import SurveyPreview from './SurveyPreview';
import { useSurvey } from './useSurvey';

function CreateSurvey() {
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

export default CreateSurvey;
