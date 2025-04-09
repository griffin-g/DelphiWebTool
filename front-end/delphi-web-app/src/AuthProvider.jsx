import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import apiClient from "./utils/apiClient";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("site"))
      setUser(jwtDecode(localStorage.getItem("site")));
  }, []);
  const loginAction = async (email, password) => {
    try {
      const response = await apiClient.post("/users/login/", {
        email,
        password,
      });

      //const res = await response.json();
      const res = response;
      console.log("res", res);
      if (res.data) {
        setUser(jwtDecode(res.data.token));
        setToken(res.data.token);
        localStorage.setItem("site", res.data.token);
        localStorage.setItem("user", jwtDecode(res.data.token));
        //navigate("/about-us");
        return true;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  const signUpAction = async (first_name, last_name, email, password_hash) => {
    try {
      const response = await apiClient.post("/users/register/", {
        first_name,
        last_name,
        email,
        password_hash,
        token,
        //formData,
      });

      //const res = await response.json();
      const res = response;
      console.log("res", res);
      if (res.data) {
        setUser(jwtDecode(res.data.token));
        setToken(res.data.token);
        localStorage.setItem("site", res.data.token);
        localStorage.setItem("user", jwtDecode(res.data.token));
        //navigate("/about-us");
        return true;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/about-us");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut, signUpAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
