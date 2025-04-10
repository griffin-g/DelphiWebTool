import React from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/defaultV2.min.css";
import apiClient from "../../utils/apiClient";

const SurveyForm = ({ survey, anonymousIdentifier }) => {
  if (!survey) {
    return <p>Loading survey...</p>;
  }

  const surveyModel = new Model(survey);
  surveyModel.onTextMarkdown.add((sender, options) => {
    options.html = options.text;
  });

  surveyModel.onComplete.add(async (sender) => {
    const payload = {
      survey_uuid: survey.uuid,
      delphi_round: survey.delphi_round,
      response_data: sender.data,
      hashedIdentifier: anonymousIdentifier,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await apiClient.post("/responses/", payload);

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