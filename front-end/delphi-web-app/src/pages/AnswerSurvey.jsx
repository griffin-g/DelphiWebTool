import React, { useState, useEffect } from "react";
import { Survey } from "survey-react-ui"; // SurveyJS UI component
import { Model } from "survey-core"; // SurveyJS core functionality
import "survey-core/defaultV2.min.css"; // SurveyJS default styling

const SurveyForm = ({ surveyId }) => {
  const [surveyModel, setSurveyModel] = useState(null);

  // Mock data for survey and questions (for testing without backend)
  const mockSurvey = {
    title: "Sample Survey",
    questions: [
      {
        type: "text",
        name: "name",
        title: "What is your name?",
        isRequired: true,
      },
      {
        type: "radiogroup",
        name: "favoriteColor",
        title: "What is your favorite color?",
        choices: ["Red", "Blue", "Green", "Yellow"],
        isRequired: true,
      },
      {
        type: "ranking",
        name: "favoriteFruits",
        title: "Rank your favorite fruits.",
        choices: ["Apple", "Banana", "Cherry"],
        isRequired: true,
      },
    ],
  };

  // Initialize the SurveyJS model with mock data
  useEffect(() => {
    const surveyJson = {
      title: mockSurvey.title,
      questions: mockSurvey.questions,
    };

    const model = new Model(surveyJson); // Create survey model using core Model
    setSurveyModel(model);
  }, []);

  // Handle survey submission
  const handleSurveySubmit = () => {
    const responses = surveyModel.data;
    console.log("Survey Responses:", responses);
    alert("Survey submitted! Check console for responses.");
  };

  useEffect(() => {
    if (surveyModel) {
      surveyModel.onComplete.add(handleSurveySubmit); // Attach submit handler
    }
  }, [surveyModel]);

  if (!surveyModel) return <div>Loading...</div>;

  return (
    <div>
      <h1>{mockSurvey.title}</h1>
      <Survey model={surveyModel} /> {/* Render survey */}
    </div>
  );
};

export default SurveyForm;
