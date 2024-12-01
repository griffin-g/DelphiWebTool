import React, { useState } from "react";
import InviteModal from "../Components/InviteModal";
import { Button } from "@mui/material";
const InviteModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Invite Modal
      </Button>
      <InviteModal surveyId="1" open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default InviteModalExample;
