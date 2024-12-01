import '../App.css';
import SurveyBuilder from './survey-components/Survey-Builder';
import QuestionList from './survey-components/Question-List';
import SurveyDisplay from './survey-components/Survey-Display';
import { useSurvey } from './survey-components/UseSurvey';

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
        <SurveyDisplay surveyData={surveyData} />
      )}
    </div>
  );
}

export default CreateSurvey;
