import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import SurveyDisplay from "./survey-components/Survey-Display";
import Header from "../Components/Header";

const PublishPage = () => {
  const { surveyID } = useParams();
  const [tempToken, setTempToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/surveys/${surveyID}`);
        if (!response.ok) throw new Error("Failed to load survey data.");
        const data = await response.json();
        setSurveyData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSurveyData();
  }, [surveyID]);

  const handlePublish = async () => {
    if (!accessToken.trim()) {
      setError("Access token is required to publish the survey.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/surveys/publish/${surveyID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to publish survey. Please try again.");
      }

      const result = await response.json();
      setSuccess(true);
      console.log(result.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToken = () => {
    setAccessToken(tempToken.trim());
    setError("");
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4, bgcolor: "#f5f5f5", p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Publish Survey
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          To publish your survey, please enter an access token that participants will use to access it.
        </Typography>

        {success && <Alert severity="success">Survey published successfully!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Access Token"
            variant="outlined"
            fullWidth
            value={tempToken}
            onChange={(e) => setTempToken(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="Enter a unique access token"
          />
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSubmitToken}
            disabled={!tempToken.trim()}
          >
            Submit Token
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handlePublish}
            disabled={loading || !accessToken.trim()}
          >
            {loading ? <CircularProgress size={24} color="secondary" /> : "Publish Survey"}
          </Button>
        
        </Box>

        {surveyData ? (
          <Box sx={{ mb: 3 }}>
            <SurveyDisplay surveyData={surveyData} />
          </Box>
        ) : (
          !error && <CircularProgress />
        )}

      </Container>
    </>
  );
};

export default PublishPage;
