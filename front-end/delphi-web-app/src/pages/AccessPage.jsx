import React, { useState } from "react";
import Header from "../Components/Header";
import { TextField, Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AccessPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission to validate the token
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message on each submit

    // TODO: API call to validate token
    // Store authentication cookie
    // Navigate to new page
  };

  return (
    <div>
    <Header></Header>
    <Container maxWidth="sm" sx={{ mt: 4, bgcolor: "#f5f5f5", p: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Access Survey
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        To access the survey, please enter the token provided by the survey creator.
      </Typography>
      
      <form onSubmit={handleSubmit}>
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
            {loading ? <CircularProgress size={24} color="secondary" /> : "Access Survey"}
          </Button>
        </Box>
      </form>
    </Container>
    </div>
  );
}

export default AccessPage;
