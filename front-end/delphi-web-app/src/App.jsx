import "./App.css";
import "survey-core/defaultV2.min.css";
import "./survey-creator.css";
import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./pages/CreateSurvey";
import AboutUs from "./pages/AboutUs";
import SurveyForm from "./pages/AnswerSurvey";
import ResponsiveAppBar from "./pages/page-components/app-bar";

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/create-survey" element={<CreateSurvey></CreateSurvey>} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="answer-survey" element={<SurveyForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
