import { useState } from "react";
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

  const [questionData, setQuestionData] = useState({
    title: "",
    description: "",
    type: "text",
    choices: [],
    newChoice: "",
  });

  const handleFieldChange = (field, value) => {
    setQuestionData((prev) => ({ ...prev, [field]: value }));
  };

  const addChoice = () => {
    const { newChoice, choices } = questionData;
    if (newChoice.trim()) {
      setQuestionData({
        ...questionData,
        choices: [...choices, newChoice.trim()],
        newChoice: "",
      });
    }
  };

  const deleteChoice = (index) => {
    setQuestionData((prev) => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index),
    }));
  };

  const handleNewQuestion = () => {
    if (
      questionData.title.trim() &&
      !questions.some((q) => q.title === questionData.title)
    ) {
      const newQuestion = {
        name: `question${Date.now()}`,
        type: questionData.type,
        title: questionData.title,
        description: questionData.description,
        ...(questionData.type === "ranking" ||
        questionData.type === "checkbox"
          ? { choices: questionData.choices }
          : {}),
      };
      handleAddQuestion(newQuestion);
      setQuestionData({
        title: "",
        description: "",
        type: "text",
        choices: [],
        newChoice: "",
      });
    }
  };

  return (
    <div>
      <Header />
      <h1>Edit Survey: {title || "Untitled Survey"}</h1>

      <QuestionForm
        questionType={questionData.type}
        setQuestionType={(type) => handleFieldChange("type", type)}
        questionTitle={questionData.title}
        setQuestionTitle={(title) => handleFieldChange("title", title)}
        questionDescription={questionData.description}
        setQuestionDescription={(desc) =>
          handleFieldChange("description", desc)
        }
        choices={questionData.choices}
        newChoice={questionData.newChoice}
        setNewChoice={(choice) => handleFieldChange("newChoice", choice)}
        addChoice={addChoice}
        deleteChoice={deleteChoice}
      />

      {/* Button to add a new question */}
      <button onClick={handleNewQuestion} disabled={!questionData.title.trim()}>
        Add Question
      </button>

      <QuestionList
        questions={questions}
        onEditQuestion={handleEditQuestion}
        onDeleteQuestion={handleDeleteQuestion}
      />

      {/* Button to save survey */}
      <button onClick={() => handleSaveSurvey(true)}>Save Survey</button>
    </div>
  );
};

export default EditSurvey;
