import React from "react";
import Grid from "@mui/material/Grid2";
import LoginComponent from "../Components/LoginComponent";

function LoginPage() {
  return (
    <Grid
      container
      width={{ width: "100vw", height: "100vh", justifyContent: "center" }}
    >
      <Grid
        container
        sx={{
          //width: "50vw",
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
        }}
      >
        <LoginComponent />
      </Grid>
      {/* <Grid
        container
        sx={{ width: "50vw", backgroundColor: "#9DD6C8", height: "100%" }}
      ></Grid> */}
    </Grid>
  );
}

export default LoginPage;
