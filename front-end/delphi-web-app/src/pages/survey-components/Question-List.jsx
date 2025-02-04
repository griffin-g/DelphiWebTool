import React from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  const updateQuestion = (index, changes) => {
    const updatedQuestion = { ...questions[index], ...changes };
    onEditQuestion(index, updatedQuestion);
  };
  // edit a choice
  const handleEditChoice = (index, choiceIndex, value) => {
    const updatedChoices = [...(questions[index].choices || [])];
    updatedChoices[choiceIndex] = value;
    updateQuestion(index, { choices: updatedChoices });
  };
  // add a choice
  const handleAddChoice = (index) => {
    const updatedChoices = [...(questions[index].choices || []), ""];
    updateQuestion(index, { choices: updatedChoices });
  };
  // delete a choice
  const handleDeleteChoice = (index, choiceIndex) => {
    const updatedChoices = (questions[index].choices || []).filter(
      (_, i) => i !== choiceIndex
    );
    updateQuestion(index, { choices: updatedChoices });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Questions
      </Typography>
      {questions.length === 0 ? (
        <Typography>No questions to display.</Typography>
      ) : (
        <List>
          {questions.map((question, index) => (
            <ListItem key={index} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={question.title || ""}
                  onChange={(e) => updateQuestion(index, { title: e.target.value })}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={question.description || ""}
                  onChange={(e) => updateQuestion(index, { description: e.target.value })}
                />

                {(question.type === "ranking" || question.type === "checkbox") && (
                  <div>
                    <Typography variant="subtitle1">
                      {question.type === "ranking" ? "Ranking Options:" : "Checkbox Options:"}
                    </Typography>
                    <List>
                      {question.choices?.map((choice, choiceIndex) => (
                        <ListItem key={choiceIndex} sx={{ display: "flex", alignItems: "center" }}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            value={choice}
                            onChange={(e) => handleEditChoice(index, choiceIndex, e.target.value)}
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
                      sx={{ mt: 2 }}
                    >
                      Add Choice
                    </Button>
                  </div>
                )}

                <Button
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
      )}
    </Container>
  );
}

export default QuestionList;
