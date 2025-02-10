import React from "react";
import { InputLabel, MenuItem, Select, Grid2 } from "@mui/material";

function RoundSelect({ maxRound, selectedDelphiRound, handleDelphiSelect }) {
  return (
    <>
      <InputLabel id="delphi-round-label">Delphi Round</InputLabel>
      <Select
        labelId="delphi-round-label"
        id="delphi-round-select"
        value={selectedDelphiRound}
        label="selectedDelphiRound"
        onChange={handleDelphiSelect}
        disabled={maxRound === undefined || maxRound === null} // Disable until resolved
      >
        {maxRound && Number.isInteger(maxRound) ? (
          Array.from({ length: maxRound }, (_, index) => (
            <MenuItem key={"item" + index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            Loading...
          </MenuItem> // Fallback
        )}
      </Select>
    </>
  );
}

export default RoundSelect;
