import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useAuth } from "../AuthProvider";
import { Button, Box, Typography, Grid2 } from "@mui/material";
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
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Survey Management
      </Typography>

      <Grid2
        container
        direction="row"
        alignItems="start"
        sx={{ justifyContent: "center", mt: 3 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#A09260",
            width: "200px",
            height: "50px",
            marginRight: "100px",
          }}
          onClick={() => navigate(`/create-survey`)}
        >
          Create New Survey
        </Button>

        <br />
        <Grid2 container direction="column" sx={{ width: "600px", mt: 2 }}>
          {surveys.length === 0 ? (
            <Typography align="center">No surveys available.</Typography>
          ) : (
            surveys.map((survey) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  key={survey.survey_id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "80%",
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
                      color="primary"
                      sx={{ mr: 1 }}
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
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={() =>
                          navigate(
                            `/edit-survey/${survey.survey_id}/${survey.delphi_round}`
                          )
                        }
                      >
                        Results
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="secondary"
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
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  sx={{
                    width: "10px",
                    height: "25px",
                    display: "flex",
                    marginLeft: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiButton-startIcon": {
                      marginRight: "0px", // Remove right margin on the icon
                    },
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
                        surveys.filter((s) => s.survey_id !== survey.survey_id)
                      );
                    } catch (error) {
                      setError(error.message);
                    }
                  }}
                ></Button>
              </Box>
            ))
          )}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default SurveyManagement;
