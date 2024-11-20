import "./App.css";
import "survey-core/defaultV2.min.css";
import "./survey-creator.css";
import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./pages/CreateSurvey";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/create-survey" element={<CreateSurvey></CreateSurvey>} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
