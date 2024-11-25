import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./pages/CreateSurvey";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./AuthProvider";
import SurveyForm from "./pages/AnswerSurvey";
import ResponsiveAppBar from "./pages/page-components/app-bar";

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route
            path="/create-survey"
            element={<CreateSurvey></CreateSurvey>}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
