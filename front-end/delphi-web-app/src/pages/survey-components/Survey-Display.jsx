import React, { useMemo } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';

function SurveyDisplay({ surveyData }) {
  const survey = useMemo(() => {
    const model = new Model(surveyData);
    model.onTextMarkdown.add((sender, options) => {
      options.html = options.text;
    });
    return model;
  }, [surveyData]);

  return (
    <div>
      <h2>Survey Preview</h2>
      <Survey model={survey} />
    </div>
  );
}

export default SurveyDisplay;