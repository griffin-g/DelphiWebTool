import React from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";

const SurveyForm = ({ survey }) => {
  if (!survey) {
    return <p>Loading survey...</p>;
  }

  const surveyModel = new Model(survey);

  surveyModel.onComplete.add(async (sender) => {
    const surveyData = sender.data;
    const payload = {
      survey_id: survey.survey_id, 
      delphi_round: survey.delphi_round,
      response_data: surveyData,        
    };

    try {
      const response = await fetch("http://localhost:3001/responses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Survey submitted successfully!");
      } else {
        alert("There was a problem submitting your survey.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  });

  return <Survey model={surveyModel} />;
};

export default SurveyForm;
