import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./pages/CreateSurvey";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./AuthProvider";
import SurveyForm from "./pages/AnswerSurvey";
import SurveyManagement from "./pages/SurveyManagement";
import EditSurvey from "./pages/EditSurvey";
import ResponsiveAppBar from "./pages/page-components/app-bar";
import SignUpPage from "./pages/SignUpPage";
import InviteModalExample from "./pages/InviteModalExample";
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
          <Route path="/answer-survey" element={<SurveyForm />} />
          <Route path="/manage-survey" element={<SurveyManagement />} />
          <Route path="/edit-survey/:surveyID" element={<EditSurvey />} />
          {/* <Route path="/view-survey/:surveyID" element={<ViewSurvey />}/> */}

          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/invite-example" element={<InviteModalExample />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
