import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const InviteModal = ({
  open,
  onClose,
  inviteList = [],
  addInviteList,
  surveyId,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addInviteList(surveyId, email.trim());
      setEmail("");
    }
  };

  const handleDelete = (index) => {
    const updatedList = inviteList.filter((_, i) => i !== index);
    addInviteList(surveyId, updatedList);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="invite-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="invite-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Invite List
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Email
          </Button>
        </form>

        <List sx={{ mt: 2 }}>
          {inviteList.map((email, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={email} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default InviteModal;
