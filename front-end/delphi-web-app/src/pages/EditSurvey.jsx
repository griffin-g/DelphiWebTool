import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSurvey } from "./survey-components/UseSurvey";
import QuestionList from "./survey-components/Question-List";
import QuestionForm from "./survey-components/Question-Form";
import Header from "../Components/Header";

const EditSurvey = () => {
  const { surveyID } = useParams(); // Get surveyID from the URL params
  const {
    title,
    questions,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveSurvey,
  } = useSurvey(surveyID); 

  const [questionType, setQuestionType] = useState(""); 
  const [questionTitle, setQuestionTitleState] = useState("");
  const [questionDescription, setQuestionDescription] = useState(""); 
  const [choices, setChoices] = useState([]); 
  const [newChoice, setNewChoice] = useState("");

  // add a new question with type, title, description, and if mc or ranking, choices
  const handleNewQuestion = () => {
    const newQuestion = {
      type: questionType,
      title: questionTitle,
      description: questionDescription,
      choices,
    };

    // Check if the new question already exists before adding
    const existingQuestion = questions.find(
      (q) => q.title === newQuestion.title && q.description === newQuestion.description
    );
    if (!existingQuestion) {
      handleAddQuestion(newQuestion);
    }

    // Clear form
    setQuestionTitleState("");
    setQuestionDescription("");
    setChoices([]);
    setNewChoice("");
  };

  return (
    <div>
      <Header />
      <h1>Edit Survey: {title || "Untitled Survey"}</h1>

      <QuestionForm
        questionType={questionType}
        setQuestionType={setQuestionType}
        questionTitle={questionTitle}
        setQuestionTitle={setQuestionTitleState}
        questionDescription={questionDescription}
        setQuestionDescription={setQuestionDescription}
        choices={choices}
        newChoice={newChoice}
        setNewChoice={setNewChoice}
        addChoice={() => {
          if (newChoice) {
            setChoices([...choices, newChoice]);
            setNewChoice(""); // Clear the input field after adding a choice
          }
        }}
      />

      {/* Button to add a new question */}
      <button onClick={handleNewQuestion}>Add Question</button>

      <QuestionList
        questions={questions}
        onEditQuestion={handleEditQuestion}
        onDeleteQuestion={handleDeleteQuestion}
      />

      <button onClick={handleSaveSurvey}>Save Survey</button>
    </div>
  );
};

export default EditSurvey;
