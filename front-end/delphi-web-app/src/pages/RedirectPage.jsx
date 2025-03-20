import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function RedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [uuid, setUuid] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { surveyUUID } = useParams();

  console.log("Survey UUID from params:", surveyUUID);
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const uuidParam = params.get("uuid");
    console.log("UUID from URL:", uuidParam);
    if (uuidParam) {
      setUuid(uuidParam);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("email in submit", email);
    try {
      const response = await fetch(
        "http://localhost:3001/surveys/validate-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uuid: surveyUUID,
            accessToken: token,
            email: email,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Validation failed. Please check your UUID and token."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("surveyToken", data.token);

      navigate(`/participate/${surveyUUID}`);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Container
        maxWidth="sm"
        sx={{ mt: 4, bgcolor: "#f5f5f5", p: 4, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Access Survey
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please enter your survey's UUID and the access token provided by the
          survey creator.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            error={Boolean(error)}
          />
          <TextField
            label="Survey Access Token"
            variant="outlined"
            fullWidth
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{ mb: 2 }}
            error={Boolean(error)}
            helperText={error}
          />

          <Box sx={{ textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                "Access Survey"
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default RedirectPage;
