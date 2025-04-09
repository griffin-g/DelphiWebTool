import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
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

function LoginComponent({ setOpen }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log("in handle submit");
    if (input.email !== "" && input.password !== "") {
      console.log("valid input");

      const res = auth.loginAction(input.email, input.password);
      if (res) {
        console.log("login success", res);

        if (isMobile) navigate("/about-us");
        else setOpen(false);
      }
    } else {
      alert("please provide a valid input");
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(input);
  };

  return (
    <Box
      sx={{
        width: 300,
        margin: "auto",
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: COLORS.white,
      }}
    >
      <form onSubmit={handleSubmitEvent}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Email
        </Typography>
        <TextField
          fullWidth
          name="email"
          variant="outlined"
          size="small"
          placeholder="Enter email"
          sx={{ mb: 2 }}
          onChange={handleInput}
        />

        <Typography variant="body1" sx={{ mb: 1 }}>
          Password
        </Typography>
        <TextField
          fullWidth
          name="password"
          variant="outlined"
          size="small"
          placeholder="Enter password"
          type="password"
          sx={{ mb: 3 }}
          onChange={handleInput}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          name="submit"
          sx={{
            backgroundColor: "#4A77E5",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#3A67D5",
            },
            mb: 2,
          }}
        >
          Sign In
        </Button>
      </form>
      <Link
        href="#"
        variant="body2"
        underline="none"
        sx={{ display: "block", textAlign: "center" }}
      >
        Forgot password?
      </Link>
    </Box>
  );
}

export default LoginComponent;
