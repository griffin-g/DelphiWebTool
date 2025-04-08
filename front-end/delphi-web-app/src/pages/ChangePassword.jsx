import { useState } from "react";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";
import { useAuth } from "../AuthProvider";
import Header from "../Components/Header";
const ChangePassword = () => {
  const { changePasswordAction } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      setSuccess(false);
      return;
    }

    const result = await changePasswordAction(oldPassword, newPassword);
    setMessage(result.message);
    setSuccess(result.success);
  };

  return (
    <>
    <Header></Header>
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h4" gutterBottom>
          Change Password
        </Typography>
        {message && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Old Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default ChangePassword;
