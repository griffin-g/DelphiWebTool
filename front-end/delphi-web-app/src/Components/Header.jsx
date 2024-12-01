import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
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
            height: "auto",
            alignContent: "center",
          }}
        >
          <Grid item sx={{ height: "40px", width: "auto" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Delphi Web App
            </Typography>
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
        <Grid
          container
          sx={{
            width: "100%",
            justifyContent: "space-between",
            paddingX: "20%",
            alignContent: "center",
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/about-us"
            sx={{
              color: "inherit", // Default color
              textDecoration: "none", // No underline
              "&:hover": {
                color: "white", // Hover color
              },
            }}
          >
            About Us
          </Typography>
          <Box
            sx={{
              width: "1px",
              height: "20px",
              backgroundColor: "black",
              margin: "0 10px",
              paddingTop: "10px",
            }}
          />
          <Typography
            variant="h6"
            component="a"
            href="/about-us"
            sx={{
              color: "inherit", // Default color
              textDecoration: "none", // No underline
              "&:hover": {
                color: "white", // Hover color
              },
            }}
          >
            Investigate The Delphi Method
          </Typography>
          <Box
            sx={{
              width: "1px",
              height: "20px",
              backgroundColor: "black",
              margin: "0 10px",
              paddingTop: "10px",
            }}
          />
          <Typography
            variant="h6"
            component="a"
            href="/about-us"
            sx={{
              color: "inherit", // Default color
              textDecoration: "none", // No underline
              "&:hover": {
                color: "white", // Hover color
              },
            }}
          >
            Manage Surveys
          </Typography>
          <Box
            sx={{
              width: "1px",
              height: "20px",
              backgroundColor: "black",
              margin: "0 10px",
              paddingTop: "10px",
            }}
          />
          <Typography
            variant="h6"
            component="a"
            href="/about-us"
            sx={{
              color: "inherit", // Default color
              textDecoration: "none", // No underline
              "&:hover": {
                color: "white", // Hover color
              },
            }}
          >
            Participating Surveys
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;
