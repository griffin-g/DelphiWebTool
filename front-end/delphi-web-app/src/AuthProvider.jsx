import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/users/email/", {
        email,
        password,
      });

      //const res = await response.json();
      const res = response;
      console.log("res", res);
      if (res.data) {
        setUser(res.data);
        //setToken(res.token);
        //localStorage.setItem("site", res.token);
        localStorage.setItem("user", res.data);
        navigate("/about-us");
        return;
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
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
