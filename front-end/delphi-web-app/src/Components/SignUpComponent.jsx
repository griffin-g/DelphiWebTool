import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const COLORS = {
  primary: "#4a77e5", // Blue - primary actions, highlights
  secondary: "#e5b44a", // Gold - secondary actions, accents
  accent: "#e5664a", // Coral - attention-grabbing elements
  background: "#f5f7fa",
  white: "#ffffff",
  gray: "#f0f0f0",
  darkGray: "#555555",
};

function SignUpComponent({ setOpen }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password_hash: "",
  });
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const auth = useAuth();
  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.first_name == "") {
      setError("Provide first name.");
      return;
    }
    if (formData.last_name == "") {
      setError("Provide last name.");
      return;
    }
    if (formData.email !== "" && formData.password_hash !== "") {
      console.log("valid input");

      const res = await auth.signUpAction(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password_hash
        // formData
      );
      console.log("after getting res", res);
      if (res.status == 499) {
        setError("User with this email already exists.");
        console.log("error 499");
      }

      if (res.status == 200) {
        console.log("sign up", res);

        if (isMobile) navigate("/about-us");
        else setOpen(false);
      }
    } else {
      setError("Please provide a valid email and password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="body1" sx={{}}>
            First Name
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <Typography variant="body1" sx={{}}>
            Last Name
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <Typography variant="body1" sx={{}}>
            Email Address
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Typography variant="body1" sx={{}}>
            Password
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            name="password_hash"
            type="password"
            value={formData.password_hash}
            onChange={handleChange}
          />
          <Button
            type="submit"
            name="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4A77E5",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#3A67D5",
              },
              mt: 2,
              mb: 2,
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpComponent;
