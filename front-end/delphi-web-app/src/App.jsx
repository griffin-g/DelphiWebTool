import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./survey-creator.css";
import { Routes, Route } from "react-router-dom";
import CreateSurvey from "./pages/CreateSurvey";

function App() {
  // const [questions, setQuestions] = useState([]);
  // const [survey, setSurvey] = useState(new Model({ elements: [] }));
  // const [questionTitle, setQuestionTitle] = useState("");
  // const [questionDescription, setQuestionDescription] = useState("");
  // const [questionType, setQuestionType] = useState("text");
  // const [choices, setChoices] = useState([]);  // State for ranking choices
  // const [newChoice, setNewChoice] = useState("");

  // const addQuestion = () => {
  //   const newQuestion = {
  //     name: `question${questions.length + 1}`,
  //     type: questionType,
  //     title: questionTitle,
  //     description: questionDescription,
  //     ...((questionType === "ranking" || questionType === "checkbox") && { choices })  // Add choices if type is ranking
  //   };
  //   const updatedQuestions = [...questions, newQuestion];
  //   setQuestions(updatedQuestions);
  //   setSurvey(new Model({ elements: updatedQuestions }));

  //   // Reset fields
  //   setQuestionTitle("");
  //   setQuestionDescription("");
  //   setChoices([]);
  // };

  // const addChoice = () => {
  //   if (newChoice.trim()) {
  //     setChoices([...choices, newChoice.trim()]);
  //     setNewChoice("");
  //   }
  // };

  // return (
  //   <div>
  //     <div className="survey-builder">
  //       <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
  //         <option value="text">Text</option>
  //         <option value="ranking">Ranking</option>
  //         <option value="checkbox">Checkbox</option>
  //         {/* Add other question types as needed */}
  //       </select>

  //       <input
  //         type="text"
  //         placeholder="Enter question title"
  //         value={questionTitle}
  //         required
  //         onChange={(e) => setQuestionTitle(e.target.value)}
  //       />

  //       <input
  //         type="text"
  //         placeholder="Enter question description"
  //         value={questionDescription}
  //         onChange={(e) => setQuestionDescription(e.target.value)}
  //       />

  //       {(questionType === "ranking" || questionType === "checkbox") && (
  //         <div>
  //           <input
  //             type="text"
  //             placeholder="Enter choice"
  //             value={newChoice}
  //             onChange={(e) => setNewChoice(e.target.value)}
  //           />
  //           <button onClick={addChoice}>Add Choice</button>
  //           <ul>
  //             {choices.map((choice, index) => (
  //               <li key={index}>{choice}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}

  //       <button onClick={addQuestion}>Add Question</button>
  //     </div>

  //     <Survey model={survey} />
  //   </div>
  // );
  return (
    <div>
      <h1>some text</h1>
      <Routes>
        <Route path="/" element={<CreateSurvey></CreateSurvey>} />
      </Routes>
    </div>
  );
}

export default App;
