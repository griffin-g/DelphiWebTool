import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Divider } from "@mui/material";
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
    handleEditSurvey
  } = useSurvey(surveyID); 

  const [questionType, setQuestionType] = useState(""); 
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState(""); 
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");

  const addChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices, newChoice]);
      setNewChoice(""); // Clear the input field after adding a choice
    }
  };

  const handleNewQuestion = () => {
    const newQuestion = {
      type: questionType,
      title: questionTitle,
      description: questionDescription,
      choices,
    };

    const existingQuestion = questions.find(
      (q) => q.title === newQuestion.title && q.description === newQuestion.description
    );
    if (!existingQuestion) {
      handleAddQuestion(newQuestion);
    }

    setQuestionTitle("");
    setQuestionDescription("");
    setChoices([]);
    setNewChoice("");
  };

  return (
    <Box>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Edit Survey: {title || "Untitled Survey"}
        </Typography>

        <QuestionForm
          questionType={questionType}
          setQuestionType={setQuestionType}
          questionTitle={questionTitle}
          setQuestionTitle={setQuestionTitle}
          questionDescription={questionDescription}
          setQuestionDescription={setQuestionDescription}
          choices={choices}
          newChoice={newChoice}
          setNewChoice={setNewChoice}
          addChoice={addChoice}
        />

        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button variant="contained" onClick={handleNewQuestion}>Add Question</Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <QuestionList
          questions={questions}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />

        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button variant="contained" onClick={handleEditSurvey}>Save Survey</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EditSurvey;
