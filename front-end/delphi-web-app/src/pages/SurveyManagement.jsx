import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useAuth } from "../AuthProvider";
import apiClient from "../utils/apiClient";
import {
  Button,
  Box,
  Typography,
  Grid2,
  IconButton,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// Your color palette
const COLORS = {
  primary: "#4a77e5", // Blue - primary actions, highlights
  secondary: "#e5b44a", // Gold - secondary actions, accents
  accent: "#e5664a", // Coral - attention-grabbing elements
  background: "#f5f7fa", // Light background
  white: "#ffffff",
  gray: "#f0f0f0",
  darkGray: "#555555",
};

const SurveyManagement = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const fetchSurveys = async () => {
    try {
      const response = await apiClient.get(
        `/surveys/user-surveys/${auth.user.id}`
      );
      const data = response.data;
      const uniqueSurveys = Object.values(
        data.reduce((acc, survey) => {
          if (!acc[survey.survey_id]) {
            acc[survey.survey_id] = survey;
          }
          return acc;
        }, {})
      );
      setSurveys(uniqueSurveys);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (auth.user != null) fetchSurveys();
  }, [auth.user]);

  return (
    <Box sx={{ backgroundColor: COLORS.background, minHeight: "100vh" }}>
      <Header />

      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="500"
            color={COLORS.darkGray}
            sx={{
              borderBottom: `3px solid ${COLORS.secondary}`,
              paddingBottom: "0.5rem",
              display: "inline-block",
            }}
          >
            Survey Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: COLORS.secondary,
              color: COLORS.white,
              padding: "0.75rem 1.5rem",
              boxShadow: "0px 4px 10px rgba(229, 180, 74, 0.3)",
              "&:hover": {
                backgroundColor: "#d9a83c",
                boxShadow: "0px 6px 15px rgba(229, 180, 74, 0.4)",
              },
            }}
            onClick={() => navigate(`/create-survey`)}
          >
            Create New Survey
          </Button>
        </Box>

        {error && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: "#fff3f0",
              border: `1px solid ${COLORS.accent}`,
              borderRadius: 2,
            }}
          >
            <Typography color={COLORS.accent}>Error: {error}</Typography>
          </Paper>
        )}

        {surveys.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 2,
              backgroundColor: COLORS.white,
              border: `1px dashed ${COLORS.primary}`,
              borderStyle: "dashed",
            }}
          >
            <Typography variant="h6" color={COLORS.darkGray} gutterBottom>
              No surveys available
            </Typography>
            <Typography color={COLORS.darkGray}>
              Create your first survey to get started
            </Typography>
          </Paper>
        ) : (
          <Box>
            {surveys.map((survey) => (
              <Paper
                key={survey.survey_id}
                elevation={0}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  p: 0,
                  borderRadius: 2,
                  backgroundColor: COLORS.white,
                  border: "1px solid #e0e0e0",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    alignSelf: "stretch",
                    backgroundColor: COLORS.primary,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                    p: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" color={COLORS.darkGray}>
                      {survey.title}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <Chip
                        label={`Round ${survey.delphi_round}`}
                        size="small"
                        sx={{
                          backgroundColor: COLORS.primary,
                          color: "white",
                          height: "24px",
                          marginRight: 1,
                        }}
                      />
                      {survey.is_active ? (
                        <Chip
                          label="Active"
                          size="small"
                          sx={{
                            backgroundColor: COLORS.accent,
                            color: "white",
                            height: "24px",
                          }}
                        />
                      ) : (
                        <Chip
                          label="Draft"
                          size="small"
                          sx={{
                            backgroundColor: "#e0e0e0",
                            color: "#666",
                            height: "24px",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="text"
                      sx={{
                        color: COLORS.primary,
                        fontWeight: 500,
                        mr: 1,
                        "&:hover": {
                          backgroundColor: "rgba(74, 119, 229, 0.08)",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `/edit-survey/${survey.survey_id}/${survey.delphi_round}`
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mx: 0.5, height: 20 }}
                    />
                    {!survey.is_active && (
                      <>
                        <Button
                          variant="text"
                          sx={{
                            color: COLORS.primary,
                            fontWeight: 500,
                            mr: 1,
                            "&:hover": {
                              backgroundColor: "rgba(74, 119, 229, 0.08)",
                            },
                          }}
                          onClick={() =>
                            navigate(
                              `/results-survey/${survey.survey_id}/${survey.delphi_round}/${survey.uuid}`
                            )
                          }
                        >
                          Results
                        </Button>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ mx: 0.5, height: 20 }}
                        />
                      </>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: survey.is_active
                          ? COLORS.secondary
                          : COLORS.accent,
                        color: COLORS.white,
                        "&:hover": {
                          backgroundColor: survey.is_active
                            ? "#d9a83c"
                            : "#d9553a",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `/publish-survey/${survey.survey_id}/${survey.delphi_round}`
                        )
                      }
                    >
                      {survey.is_active ? "Edit Publication" : "Publish"}
                    </Button>

                    <IconButton
                      sx={{
                        color: "#d32f2f",
                        ml: 1,
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.08)",
                        },
                      }}
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            `http://localhost:3001/surveys/${survey.survey_id}`,
                            { method: "DELETE" }
                          );
                          if (!response.ok)
                            throw new Error("Failed to delete survey");
                          setSurveys(
                            surveys.filter(
                              (s) => s.survey_id !== survey.survey_id
                            )
                          );
                        } catch (error) {
                          setError(error.message);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SurveyManagement;
