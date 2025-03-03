import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SurveyForm from "./survey-components/Survey-Form";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography } from "@mui/material";
import "survey-core/defaultV2.min.css";

function ParticipatePage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurvey = async () => {
      const token = localStorage.getItem('surveyToken');
      console.log('Retrieved token:', token); // Debug log
      
      if (!token) {
        console.log('No token found, redirecting...'); // Debug log
        navigate(`/access-survey?uuid=${uuid}`);
        return;
      }

      try {
        console.log('Making request with headers:', {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        const response = await fetch(`http://localhost:3001/surveys/uuid/${uuid}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        
        
        if (!response.ok) {
          const errData = await response.json();
          console.log('Error response:', errData); 
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('surveyToken');
            navigate(`/access-survey/redirect?uuid=${uuid}`);
            return;
          }
          throw new Error(errData.message || "Survey not found");
        }
        
        const surveyData = await response.json();
        console.log('Survey data received:', surveyData);
        setSurvey(surveyData);
      } catch (err) {
        console.error("Error fetching survey:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [uuid, navigate]);

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Participate in Survey
          </Typography>
          <SurveyForm survey={survey} />
          </>
      )}
    </Container>
  );
}

export default ParticipatePage;