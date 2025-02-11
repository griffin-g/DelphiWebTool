import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../AuthProvider";

function LoginComponent() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log("in handle submit");
    if (input.email !== "" && input.password !== "") {
      console.log("valid input");

      auth.loginAction(input.email, input.password);
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
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#9DD6C8",
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
