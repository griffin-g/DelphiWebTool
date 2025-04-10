import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./pages/CreateSurvey";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./AuthProvider";
import SurveyManagement from "./pages/SurveyManagement";
import EditSurvey from "./pages/EditSurvey";
import ResponsiveAppBar from "./pages/page-components/app-bar";
import SignUpPage from "./pages/SignUpPage";
import InviteModalExample from "./pages/InviteModalExample";
import RedirectPage from "./pages/RedirectPage";
import PublishPage from "./pages/PublishSurvey";
import ParticipatePage from "./pages/Participate";
import ResultsSurvey from "./pages/ResultsSurvey";
import DelphiMethodPage from "./pages/DelphiMethodPage";
import ChangePassword from "./pages/ChangePassword";


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
          <Route path="/manage-survey" element={<SurveyManagement />} />
          <Route path="/access-survey/:surveyUUID" element={<RedirectPage />} />
          <Route
            path="/edit-survey/:surveyID/:delphiRound"
            element={<EditSurvey />}
          />
          <Route
            path="/publish-survey/:surveyID/:delphiRound"
            element={<PublishPage />}
          />
          <Route path="/participate/:uuid" element={<ParticipatePage />} />

          {/* <Route path="/view-survey/:surveyID" element={<ViewSurvey />}/> */}

          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/invite-example" element={<InviteModalExample />} />
          <Route
            path="/results-survey/:surveyID/:delphiRound/:surveyUUID"
            element={<ResultsSurvey />}
          />
          <Route path="/delphi-method" element={<DelphiMethodPage />} />
          <Route path="/change-password" element={<ChangePassword />} />

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
