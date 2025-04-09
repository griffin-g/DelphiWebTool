import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

function SignUpComponent({ setOpen }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password_hash: "",
  });
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.email !== "" && formData.password !== "") {
      console.log("valid input");

      const res = auth.signUpAction(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.password_hash
        // formData
      );
      if (res) {
        console.log("sign up", res);

        if (isMobile) navigate("/about-us");
        else setOpen(false);
      }
    } else {
      alert("please provide a valid input");
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
            type="password_hash"
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
