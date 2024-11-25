import React from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";

const SurveyForm = ({ survey }) => {
  const surveyModel = new Model(survey.elements); 

  const handleSurveyComplete = (sender) => {
    const surveyData = sender.data;
    console.log("Survey Completed with data:", surveyData); // TEST purposes only

  };

  surveyModel.onComplete.add(handleSurveyComplete);

  return (
    <div>
      <Survey model={surveyModel} />
    </div>
  );
};

export default SurveyForm;
