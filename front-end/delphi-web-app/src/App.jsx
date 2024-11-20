import "./App.css";
import "survey-core/defaultV2.min.css";
import "./survey-creator.css";
import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./pages/CreateSurvey";

function App() {
  return (
    <div>
      <h1>some text</h1>
      <Routes>
        <Route path="/create-survey" element={<CreateSurvey></CreateSurvey>} />
      </Routes>
    </div>
  );
}

export default App;
