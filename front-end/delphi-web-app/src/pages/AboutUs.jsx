import React from "react";
import Header from "../Components/Header";
import { useAuth } from "../AuthProvider";
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
    </div>
  );
}

export default AboutUs;
