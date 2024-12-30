import React from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  // Update question details
  const handleEditChange = (index, field, value) => {
    const updatedQuestion = {
      ...questions[index],
      [field]: value,
    };
    onEditQuestion(index, updatedQuestion);
  };

  // Update choices
  const handleEditChoice = (questionIndex, choiceIndex, value) => {
    const updatedChoices = [...(questions[questionIndex].choices || [])];
    updatedChoices[choiceIndex] = value;

    const updatedQuestion = {
      ...questions[questionIndex],
      choices: updatedChoices,
    };
    onEditQuestion(questionIndex, updatedQuestion);
  };

  // Add a new choice
  const handleAddChoice = (index) => {
    const updatedQuestion = {
      ...questions[index],
      choices: [...(questions[index].choices || []), ""],
    };
    onEditQuestion(index, updatedQuestion);
  };

  // Delete a choice
  const handleDeleteChoice = (questionIndex, choiceIndex) => {
    const updatedChoices = (questions[questionIndex].choices || []).filter(
      (_, idx) => idx !== choiceIndex
    );

    const updatedQuestion = {
      ...questions[questionIndex],
      choices: updatedChoices,
    };
    onEditQuestion(questionIndex, updatedQuestion);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}> 
    <div>
      <Typography variant="h4" gutterBottom>
        Questions
      </Typography>
      {questions.length === 0 && (
        <Typography variant="body1">No questions added yet.</Typography>
      )}
      <List>
        {questions.map((question, index) => (
          <ListItem key={index} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={question.title}
                onChange={(e) => handleEditChange(index, "title", e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={question.description}
                onChange={(e) => handleEditChange(index, "description", e.target.value)}
              />
              {["ranking", "checkbox"].includes(question.type) && (
                <div>
                  <Typography variant="subtitle1">Choices:</Typography>
                  <List>
                    {question.choices?.map((choice, choiceIndex) => (
                      <ListItem key={choiceIndex} sx={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={choice}
                          onChange={(e) =>
                            handleEditChoice(index, choiceIndex, e.target.value)
                          }
                        />
                        <IconButton onClick={() => handleDeleteChoice(index, choiceIndex)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => handleAddChoice(index)}
                    sx={{ mt: 1 }}
                  >
                    Add Choice
                  </Button>
                </div>
              )}
              <Button
                startIcon={<DeleteIcon />}
                variant="outlined"
                color="error"
                onClick={() => onDeleteQuestion(index)}
              >
                Delete Question
              </Button>
            </Stack>
          </ListItem>
        ))}
      </List>
    </div>
    </Container>
  );
}

export default QuestionList;
