import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const SurveyManagement = ({ userID }) => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSurveys = async () => {
    try {
      const response = await fetch(`http://localhost:3001/surveys/user-surveys/${userID}`);
      if (!response.ok) throw new Error("Failed to fetch surveys");
      const data = await response.json();
      
      setSurveys(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, [userID]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <h1>Survey Management</h1>
      <button onClick={() => navigate(`/create-survey`)}>Create New Survey</button>
      
      {surveys.length === 0 ? (
        <p>No surveys available.</p>
      ) : (
        <ul>
          {surveys.map((survey) => (
            <li key={survey.survey_id}>
              <h2>{survey.title}</h2>
              <p>Current Delphi Round: {survey.delphi_round}</p>
              <button onClick={() => navigate(`/edit-survey/${survey.survey_id}`)}>
                Edit Survey
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyManagement;
