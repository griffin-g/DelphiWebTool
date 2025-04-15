import React, { useState } from "react";
import { Box, Typography, useMediaQuery, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import COLORS from "../pages/themes/colors";

function LoginComponent({ setOpen }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const auth = useAuth();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    console.log("in handle submit");
    setError(""); // Clear any previous errors

    try {
      if (input.email === "" || input.password === "") {
        setError("Please provide a valid email and password");
        return;
      }

      console.log("valid input");
      const res = await auth.loginAction(input.email, input.password);
      console.log("res in login component", res);
      if (res.status === 401 || res.status === 404) {
        setError("Invalid email or password. Please try again.");
      }

      if (res.status === 200) {
        console.log("login success", res);
        if (isMobile) navigate("/about-us");
        else setOpen(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login. Please try again.");
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
