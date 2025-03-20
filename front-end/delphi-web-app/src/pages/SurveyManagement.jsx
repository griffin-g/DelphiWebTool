import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useAuth } from "../AuthProvider";
import { Button, Box, Typography, Grid2, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SurveyManagement = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const fetchSurveys = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/surveys/user-surveys/${auth.user.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch surveys");
      const data = await response.json();
      const uniqueSurveys = Object.values(
        data.reduce((acc, survey) => {
          if (!acc[survey.survey_id]) {
            acc[survey.survey_id] = survey;
          }
          return acc;
        }, {})
      );
      console.log("unique surveys:", uniqueSurveys);
      setSurveys(uniqueSurveys);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (auth.user != null) fetchSurveys();
  }, [auth.user]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <Grid2
        container
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Grid2 item sx={{ width: "100%", mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ mt: 4, width: "80%", maxWidth: "1200px", margin: "0 auto" }}
          >
            Survey Management
          </Typography>
        </Grid2>

        <Grid2
          container
          direction="row"
          sx={{
            width: "80%",
            maxWidth: "1200px",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <Grid2 item sx={{ width: "800px", mt: 2 }}>
            {surveys.length === 0 ? (
              <Typography align="center">No surveys available.</Typography>
            ) : (
              surveys.map((survey) => (
                <Box
                  key={survey.survey_id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "90%",
                      p: 2,
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{survey.title}</Typography>
                      <Typography variant="body2">Delphi Round: {1}</Typography>
                    </Box>
                    <Box>
                      <Button
                        variant="outlined"
                        sx={{
                          mr: 1,
                          borderColor: "#4A77E5",
                          color: "#4A77E5",
                          "&:hover": {
                            backgroundColor: "rgba(74, 119, 229, 0.04)",
                            borderColor: "#4A77E5",
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
                      {survey.is_active ? (
                        <></>
                      ) : (
                        <Button
                          variant="outlined"
                          sx={{
                            mr: 1,
                            borderColor: "#4A77E5",
                            color: "#4A77E5",
                            "&:hover": {
                              backgroundColor: "rgba(74, 119, 229, 0.04)",
                              borderColor: "#4A77E5",
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
                      )}
                      <Button
                        variant="outlined"
                        sx={{
                          mr: 1,
                          borderColor: "#4A77E5",
                          color: "#4A77E5",
                          "&:hover": {
                            backgroundColor: "rgba(74, 119, 229, 0.04)",
                            borderColor: "#4A77E5",
                          },
                        }}
                        onClick={() =>
                          navigate(
                            `/publish-survey/${survey.survey_id}/${survey.delphi_round}`
                          )
                        }
                      >
                        Publish
                      </Button>
                    </Box>
                  </Box>
                  <IconButton
                    color="error"
                    sx={{
                      height: "32px",
                      width: "32px",
                    }}
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `http://localhost:3001/surveys/${survey.survey_id}`,
                          {
                            method: "DELETE",
                          }
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
              ))
            )}
          </Grid2>
          <Grid2 item sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e5b44a",
                width: "200px",
                height: "50px",
              }}
              onClick={() => navigate(`/create-survey`)}
            >
              Create New Survey
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default SurveyManagement;
