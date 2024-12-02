import React from "react";
import Header from "../Components/Header";
import { useAuth } from "../AuthProvider";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
function AboutUs() {
  // if (localStorage.getItem("user")) {
  //   const userData = localStorage.getItem("user");
  //   console.log("User Data:", userData.user_id);
  // }
  const auth = useAuth();

  if (auth.user) {
    console.log("auth user:", auth.user);
  }
  return (
    <div>
      <Header />
      <Box>
        <Box
          sx={{
            backgroundColor: "#a87c79",
            color: "white",
            padding: "50px 20px",
            textAlign: "center",
            position: "relative",
            marginX: "15%",
            marginTop: "50px",
            borderRadius: "10px",
            height: "300px",
            alignContent: "center",
          }}
        >
          <Box sx={{ width: "60%" }}>
            <Typography variant="h4" sx={{ fontWeight: "semi-bold", mb: 2 }}>
              Accelerate your research workflow using this Delphi solution.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#b1a16b",
                color: "black",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "#9e8e5e",
                },
              }}
            >
              Learn About The Delphi Method
            </Button>
          </Box>

          {/* Angled Rectangle */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: "10%",
              width: "150px",
              height: "100px",
              backgroundColor: "#d3d3d3",
              transform: "rotate(-10deg)",
            }}
          ></Box>
        </Box>

        {/* Features Section */}
        <Grid
          container
          spacing={3}
          sx={{ paddingX: "10%", marginTop: "50px", textAlign: "center" }}
        >
          {[
            {
              title: "Easy Invite System",
              description: "Easily be able to invite participants.",
            },
            {
              title: "Customizable Delphi Method",
              description:
                "Easily customize the Delphi settings to match your personalized needs.",
            },
            {
              title: "Results Analysis",
              description:
                "Results are automatically retrieved and analyzed for your convenience.",
            },
          ].map((feature, index) => (
            <Grid
              container
              xs={12}
              sm={4}
              key={index}
              sx={{ justifyContent: "center" }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "300px",
                }}
              >
                <Box
                  sx={{
                    fontSize: "40px",
                    marginBottom: "10px",
                  }}
                >
                  🕒 {/* Placeholder for an icon */}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default AboutUs;
