import React, { useState } from "react";
import Header from "../Components/Header";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import QuestionForm from "./survey-components/Question-Form";
import QuestionList from "./survey-components/Question-List";
import SurveyDisplay from "./survey-components/Survey-Display";
import { useSurvey } from "./survey-components/UseSurvey";

function CreateSurvey() {
  const [tempTitle, setTempTitle] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [htmlContent, setHtmlContent] = useState(""); // New state for HTML content
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState("");
  const [columns, setColumns] = useState([]);
  const [newColumn, setNewColumn] = useState("");

  const [rateCount, setRateCount] = useState("");
  const [rateType, setRateType] = useState("numeric");

  const {
    title,
    setSurveyTitle,
    questions,
    surveyData,
    showPreview,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveSurvey,
    handlePreviewSurvey,
  } = useSurvey();

  const handleTitleChange = (e) => setTempTitle(e.target.value);
  const setTitle = () => {
    if (!tempTitle.trim()) {
      alert("Please enter a valid title");
      return;
    }
    setSurveyTitle(tempTitle);
  };

  const resetQuestionInputs = () => {
    setQuestionTitle("");
    setQuestionDescription("");
    setHtmlContent(""); // Reset HTML content
    setChoices([]);
    setNewChoice("");
    setRows([]);
    setNewRow("");
    setColumns([]);
    setNewColumn("");
    setRateCount("");
    setRateType("numeric");
  };

  const addQuestion = () => {
    // Handle HTML content blocks differently
    if (questionType === "html") {
      const newQuestion = {
        name: `htmlContent${Date.now()}`,
        type: "html",
        html: htmlContent, // Use the dedicated htmlContent state
      };
      handleAddQuestion(newQuestion);
      resetQuestionInputs();
      return;
    }

    // Handle regular question types
    const newQuestion = {
      name: `question${Date.now()}`,
      type: questionType,
      title: questionTitle,
      description: questionDescription,
      ...((questionType === "ranking" || questionType === "checkbox") && {
        choices,
      }),
      ...(questionType === "matrix" && { rows, columns }),
      ...(questionType === "rating" && { rateCount, rateType }),
    };
    handleAddQuestion(newQuestion);
    resetQuestionInputs();
  };

  const addChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices, newChoice.trim()]);
      setNewChoice("");
    }
  };
  const deleteChoice = (index) =>
    setChoices(choices.filter((_, i) => i !== index));
  const addRow = () => {
    if (newRow.trim()) {
      setRows([...rows, newRow.trim()]);
      setNewRow("");
    }
  };
  const deleteRow = (index) => setRows(rows.filter((_, i) => i !== index));
  const addColumn = () => {
    if (newColumn.trim()) {
      setColumns([...columns, newColumn.trim()]);
      setNewColumn("");
    }
  };
  const deleteColumn = (index) =>
    setColumns(columns.filter((_, i) => i !== index));

  const saveSurvey = async () => {
    if (!title) {
      alert("Please set a survey title before saving");
      return;
    }
    await handleSaveSurvey();
  };

  const isAddDisabled = () => {
    if (!questionTitle.trim()) return true;
    if (questionType === "ranking" || questionType === "checkbox")
      return choices.length === 0;
    if (questionType === "rating") return rateCount < 1 || rateCount > 10;
    if (questionType === "html") return !htmlContent.trim();
    return false;
  };

  return (
    <Box>
      <Header />
      <Container
        maxWidth="md"
        sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Create Survey
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Survey Title"
            variant="outlined"
            fullWidth
            value={tempTitle}
            onChange={handleTitleChange}
            placeholder="Enter survey title"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={setTitle}>
            Set Title
          </Button>
          {title && (
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Current Survey Title: {title}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <QuestionForm
          questionType={questionType}
          setQuestionType={setQuestionType}
          questionTitle={questionTitle}
          setQuestionTitle={setQuestionTitle}
          questionDescription={questionDescription}
          setQuestionDescription={setQuestionDescription}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
          choices={choices}
          newChoice={newChoice}
          setNewChoice={setNewChoice}
          addChoice={addChoice}
          deleteChoice={deleteChoice}
          rows={rows}
          newRow={newRow}
          setNewRow={setNewRow}
          addRow={addRow}
          deleteRow={deleteRow}
          columns={columns}
          newColumn={newColumn}
          setNewColumn={setNewColumn}
          addColumn={addColumn}
          deleteColumn={deleteColumn}
          rateCount={rateCount}
          setRateCount={setRateCount}
          rateType={rateType}
          setRateType={setRateType}
        />
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button
            variant="contained"
            onClick={addQuestion}
            disabled={isAddDisabled()}
          >
            Add Question
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <QuestionList
          questions={questions}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />

        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button variant="contained" onClick={saveSurvey} sx={{ mr: 2 }}>
            Save Survey
          </Button>
          <Button variant="outlined" onClick={handlePreviewSurvey}>
            Preview Survey
          </Button>
        </Box>

        {showPreview && surveyData && (
          <Box sx={{ mt: 4 }}>
            <SurveyDisplay surveyData={surveyData} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CreateSurvey;
