import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SurveyForm from "./survey-components/Survey-Form";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography, Button } from "@mui/material";
import "survey-core/defaultV2.min.css";
import Header from "../Components/Header";
import apiClient from "../apiClient";

function ParticipatePage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anonymousIdentifier, setAnonymousIdentifier] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      const token = localStorage.getItem("surveyToken");
      const storedIdentifier = localStorage.getItem("anonymousIdentifier");

      if (!token || !storedIdentifier) {
        console.log("Missing authentication data, redirecting...");
        if (uuid && uuid !== "redirect") {
          navigate(`/access-survey/${uuid}`);
        } else {
          navigate("/access-survey");
        }
        return;
      }

      setAnonymousIdentifier(storedIdentifier);

      try {
        const response = await apiClient.post(
          `/surveys/uuid/${uuid}`,
          { anonymousIdentifier: storedIdentifier },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          console.log("Error response:", errData);

          if (response.status === 401) {
            localStorage.removeItem("surveyToken");
            navigate(`/login`);
            return;
          }

          if (
            errData.message === "You have already participated in this round"
          ) {
            setError(errData.message);
            setLoading(false);
            return;
          }

          setError(errData.message || "Survey not found");
          return;
        }

        const surveyData = await response.json();
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
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {error &&
            error === "You have already participated in this round" ? (
              <>
                <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/")}
                >
                  Go to Home Page
                </Button>
              </>
            ) : (
              <>
                {error && (
                  <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
                {!error && survey && (
                  <>
                    <Typography variant="h4" gutterBottom>
                      Participate in Survey
                    </Typography>
                    <SurveyForm
                      survey={survey}
                      anonymousIdentifier={anonymousIdentifier}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default ParticipatePage;
