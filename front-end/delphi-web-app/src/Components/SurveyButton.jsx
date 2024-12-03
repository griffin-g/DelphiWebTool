import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
const SurveyButton = ({ survey_id, survey_title, delphi_round }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => navigate(`/edit-survey/${survey_id}`)}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#a87c79",
        color: "white",
        textTransform: "none",
        padding: "10px 20px",
        borderRadius: "20px",
        "&:hover": {
          backgroundColor: "#956b67",
        },
        width: "100%",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        sx={{ flex: 1 }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", justifySelf: "start" }}
        >
          {survey_title}
        </Typography>
        <Typography variant="body1" sx={{}}>
          Current Delphi Round: {delphi_round}
        </Typography>
      </Grid>
      <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
    </Button>
  );
};

export default SurveyButton;
