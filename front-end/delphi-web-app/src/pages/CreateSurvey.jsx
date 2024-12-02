import '../App.css';
import './survey-components/survey-creator.css';
import { useState } from "react";
import Header from "../Components/Header";
import SurveyBuilder from "./survey-components/Survey-Builder";
import QuestionList from "./survey-components/Question-List";
import SurveyDisplay from "./survey-components/Survey-Display";
import { useSurvey } from "./survey-components/UseSurvey";

function CreateSurvey() {
  const [tempTitle, setTempTitle] = useState(""); // Temporary state for title input
  const {
    title,
    setSurveyTitle, // Function to update title in the useSurvey hook
    questions,
    surveyData,
    showPreview,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveSurvey,
    handlePreviewSurvey,
  } = useSurvey();

  const handleTitleChange = (e) => setTempTitle(e.target.value);

  const setTitle = () => {
    if (!tempTitle.trim()) {
      alert("Please enter a valid title");
      return;
    }
    setSurveyTitle(tempTitle);
  };

  const saveSurvey = async () => {
    if (!title) {
      alert("Please set a survey title before saving");
      return;
    }
    await handleSaveSurvey();
  };

  return (
    <div>
      <Header />
      <div>
        <label>Survey Title:</label>
        <input
          type="text"
          value={tempTitle}
          onChange={handleTitleChange}
          placeholder="Enter survey title"
        />
        <button onClick={setTitle}>Set Title</button>
        {title && <p>Current Survey Title: {title}</p>} {/* Display current title */}
      </div>
      <SurveyBuilder onAddQuestion={handleAddQuestion} />
      <QuestionList
        questions={questions}
        onEditQuestion={handleEditQuestion}
        onDeleteQuestion={handleDeleteQuestion}
      />
      <button onClick={saveSurvey}>Save Survey</button>
      <button onClick={handlePreviewSurvey}>Preview Survey</button>

      {showPreview && surveyData && <SurveyDisplay surveyData={surveyData} />}
    </div>
  );
}

export default CreateSurvey;
