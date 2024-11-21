import React from "react";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function LoginComponent() {
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
      <Typography variant="body1" sx={{ mb: 1 }}>
        Email
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Enter email"
        sx={{ mb: 2 }}
      />

      <Typography variant="body1" sx={{ mb: 1 }}>
        Password
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Enter password"
        type="password"
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        fullWidth
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
