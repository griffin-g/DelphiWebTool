import React from "react";
import { Grid2, ToggleButton, ToggleButtonGroup } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ArticleIcon from "@mui/icons-material/Article";

const ResultsToggleButton = ({ viewMode, handleChange }) => {
  return (
    <Grid2
      sx={{
        width: "100%",
        height: "100%",
        borderTopLeftRadius: "3px",
        borderBottomLeftRadius: "3px",
        display: "flex",
        p: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <ToggleButtonGroup
        orientation="vertical"
        value={viewMode}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="graphs" aria-label="list">
          <EqualizerIcon />
        </ToggleButton>
        <ToggleButton value="stats" aria-label="module">
          <ArticleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid2>
  );
};

export default ResultsToggleButton;
