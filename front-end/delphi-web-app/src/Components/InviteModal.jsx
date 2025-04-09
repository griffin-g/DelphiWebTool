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
import { useEffect } from "react";

const InviteModal = ({
  open,
  onClose,
  inviteList = [],
  addInviteList,
  surveyId,
  setInviteList,
  deleteInviteList,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log(
        "Adding email to invite list from invite modal:",
        email.trim()
      );
      addInviteList(email.trim());
      setEmail("");
    }
  };

  const handleDelete = (index) => {
    deleteInviteList(inviteList[index]);
  };

  useEffect(() => {
    console.log("Updated invite list:", inviteList);
  }, [inviteList]);

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
          {inviteList.map((participant, index) => (
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
              <ListItemText primary={participant.participant_email} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default InviteModal;
