import React, { useState, useEffect } from "react";
import axios from "axios";

const SurveyList = ({ userId }) => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`/api/surveys/user/${userId}`);
        setSurveys(response.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, [userId]);

  const handlePreview = (survey) => {
    setSelectedSurvey(survey);
  };

  return (
    <div>
      <h2>Your Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.survey_id}>
            {survey.title} (Round: {survey.delphi_round})
            <button onClick={() => handlePreview(survey)}>Preview</button>
          </li>
        ))}
      </ul>
      
      {selectedSurvey && (
        <div>
          <h3>Preview: {selectedSurvey.title}</h3>
          <SurveyForm survey={selectedSurvey} />
        </div>
      )}
    </div>
  );
};

export default SurveyList;
