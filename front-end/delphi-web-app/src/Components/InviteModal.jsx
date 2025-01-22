import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const InviteModal = ({
  surveyId,
  open,
  addInviteList,
  onClose,
  inviteList,
}) => {
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState([]);

  // Fetch participants from the backend
  const fetchParticipants = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/participants/survey-id/${surveyId}`
      );
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  console.log("invite list in modal", inviteList);
  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle the invite button click
  const handleInvite = async () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }

    try {
      addInviteList(email);
      setEmail("");
      // Send the invite to the backend
      // const response = await axios.post("http://localhost:3001/participants/", {
      //   participant_email: email,
      //   survey_id: surveyId,
      // });

      // if (response.status === 200) {
      //   //setEmail(""); // Clear input field
      //   //fetchParticipants(); // Re-fetch the participants list after inviting
      // } else {
      //   alert("Failed to invite participant");
      // }
    } catch (error) {
      console.error("Error inviting participant:", error);
      alert("Error inviting participant");
    }
  };

  // Fetch participants when the modal is opened
  useEffect(() => {
    if (open) {
      //fetchParticipants();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modalBox}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Enter Participant's Email
        </Typography>
        <TextField
          fullWidth
          type="email"
          placeholder="Ex. first.last@email.com"
          value={email}
          onChange={handleEmailChange}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleInvite}
          sx={{ backgroundColor: "#6c757d", mb: 2 }}
        >
          Invite
        </Button>
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Invited Participants
        </Typography>
        <List>
          {inviteList.map((participant, index) => (
            <ListItem key={index}>
              <ListItemText primary={participant} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

const styles = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  },
};

export default InviteModal;
