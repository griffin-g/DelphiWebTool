import React from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';

function SurveyDisplay({ surveyData }) {
  // Create a SurveyJS model using the provided surveyData
  const survey = new Model(surveyData);

  return (
    <div>
      <h2>Survey Preview</h2>
      <Survey model={survey} />
    </div>
  );
}

export default SurveyDisplay;