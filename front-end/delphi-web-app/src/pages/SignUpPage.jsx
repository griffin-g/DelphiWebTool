import React from "react";
import Grid from "@mui/material/Grid2";
import SignUpComponent from "../Components/SignUpComponent";

function SignUpPage() {
  return (
    <Grid
      container
      width={{ width: "100vw", height: "100vh", justifyContent: "center" }}
    >
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
        }}
      >
        <SignUpComponent />
      </Grid>
    </Grid>
  );
}

export default SignUpPage;
