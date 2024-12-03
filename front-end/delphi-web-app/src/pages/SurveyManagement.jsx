import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useAuth } from "../AuthProvider";
import SurveyButton from "../Components/SurveyButton";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
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

      setSurveys(data);
    } catch (error) {
      setError(error.message);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.user != null) fetchSurveys();
  }, [auth.user]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <h1>Survey Management</h1>
      <Grid container direction="row" sx={{ justifyContent: "space-around" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#A09260", width: "200px", height: "50px" }}
          onClick={() => navigate(`/create-survey`)}
        >
          Create New Survey
        </Button>
        <Grid container sx={{ direction: "column", width: "600px" }}>
          {surveys.length === 0 ? (
            <p>No surveys available.</p>
          ) : (
            <>
              {surveys.map((survey) => (
                <Grid
                  key={survey.survey_id}
                  width={"100%"}
                  paddingBottom={"20px"}
                >
                  <SurveyButton
                    survey_id={survey.survey_id}
                    survey_title={survey.title}
                    delphi_round={survey.delphi_round}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
        <Grid sx={{ width: "200px" }}></Grid>
      </Grid>
    </div>
  );
};

export default SurveyManagement;
