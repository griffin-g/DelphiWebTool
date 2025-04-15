import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import SurveyDisplay from "./survey-components/Survey-Display";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import RoundSelect from "../Components/RoundSelect";
import { useSurvey } from "./survey-components/UseSurvey";
import apiClient from "../utils/apiClient";
import InviteModal from "../Components/InviteModal";

const PublishPage = () => {
  const { surveyID, delphiRound } = useParams();
  const [tempToken, setTempToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [surveyData, setSurveyData] = useState(null);
  const [selectedDelphiRound, setSelectedDelphiRound] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    maxRound,
    inviteList,
    handleAddInviteList,
    setInviteList,
    handleDeleteInviteList,
  } = useSurvey(surveyID, selectedDelphiRound);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await apiClient.get(
          `/surveys/${surveyID}/round/${selectedDelphiRound}`
        );
        setSurveyData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSurveyData();
  }, [surveyID, selectedDelphiRound]);

  const handlePublish = async () => {
    if (!accessToken.trim()) {
      setError("Access token is required to publish the survey.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await apiClient.post(
        `/surveys/publish/${surveyID}/${selectedDelphiRound}`,
        { accessToken }
      );

      if (response.status !== 200) {
        console.log(response);
        throw new Error("Failed to publish survey. Please try again.");
      }

      setSuccess(true);
      console.log("before sending invites");

      const response1 = await apiClient.post(
        `/participants/send-invites/${surveyID}/${selectedDelphiRound}`,
        { accessToken }
      );
      console.log("Invites sent:", response1);
      setLoading(false);
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

  const handleDelphiSelect = (event) => {
    setSelectedDelphiRound(event.target.value);
    console.log("selected round", event.target.value);
    navigate(`/publish-survey/${surveyID}/${event.target.value}`);
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ mt: 4, bgcolor: "#f5f5f5", p: 4, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Publish Survey
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          First select the Delphi Round to publish:
        </Typography>
        <RoundSelect
          maxRound={maxRound}
          selectedDelphiRound={selectedDelphiRound}
          handleDelphiSelect={handleDelphiSelect}
        />
        <Typography variant="body1" sx={{ mb: 3 }}>
          To publish your survey, please enter an access token that participants
          will use to access it.
        </Typography>

        {success && (
          <Alert severity="success">Survey published successfully!</Alert>
        )}
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
            onClick={() => setIsInviteModalOpen(true)}
          >
            Invite List
          </Button>
          <InviteModal
            surveyId={surveyID}
            open={isInviteModalOpen}
            onClose={() => setIsInviteModalOpen(false)}
            inviteList={inviteList}
            addInviteList={handleAddInviteList}
            setInviteList={setInviteList}
            deleteInviteList={handleDeleteInviteList}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handlePublish}
            disabled={loading || !accessToken.trim()}
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Publish Survey"
            )}
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
