import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography } from "@mui/material";
import "survey-core/defaultV2.min.css";

function ParticipatePage() {
  const { uuid } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`http://localhost:3001/surveys/uuid/${uuid}`);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Survey not found");
        }
        const surveyData = await response.json();
        console.log("Fetched survey:", surveyData);
        setSurvey(surveyData);
      } catch (err) {
        console.error("Error fetching survey:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [uuid]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  const surveyModel = new Model(survey);

  surveyModel.onComplete.add(async (sender) => {
    const surveyData = sender.data;
    const payload = {
      survey_uuid: survey.uuid,
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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Participate in Survey
      </Typography>
      <Survey model={surveyModel} />
    </Container>
  );
}

export default ParticipatePage;
