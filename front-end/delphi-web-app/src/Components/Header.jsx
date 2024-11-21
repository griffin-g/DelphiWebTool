import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box>
      <Grid
        container
        sx={{ height: "147px", backgroundColor: "#9DD6C8", width: "100%" }}
      >
        <Grid
          container
          sx={{
            paddingTop: "20px",
            paddingX: "20px",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Grid
            item
            sx={{ height: "40px", backgroundColor: "grey", width: "auto" }}
          >
            Delphi Web App
          </Grid>
          <Grid container sx={{ height: "68px", alignItems: "center" }}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <LoginIcon
                sx={{ width: "48px", height: "48px", marginRight: "10px" }}
              />
            </Link>
            <Button
              variant="contained"
              component={Link}
              to="/sign-up"
              sx={{
                width: "166px",
                height: "68px",
                backgroundColor: "#A58686",
                padding: "0px",
                "&:hover": {
                  backgroundColor: "#A58686", // Hover color
                },
              }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
