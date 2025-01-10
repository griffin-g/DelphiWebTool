import React from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  // Helper function for updating question state
  const updateQuestion = (index, changes) => {
    const updatedQuestion = { ...questions[index], ...changes };
    onEditQuestion(index, updatedQuestion);
  };

  // Update a specific field in a question
  const handleEditChange = (index, field, value) => {
    updateQuestion(index, { [field]: value });
  };

  // Add a new row or column
  const handleAddMatrixField = (index, field) => {
    const updatedFields = [...(questions[index][field] || []), ""];
    updateQuestion(index, { [field]: updatedFields });
  };

  // Edit a row or column
  const handleEditMatrixField = (index, field, fieldIndex, value) => {
    const updatedFields = [...(questions[index][field] || [])];
    updatedFields[fieldIndex] = value;
    updateQuestion(index, { [field]: updatedFields });
  };

  // Delete a row or column
  const handleDeleteMatrixField = (index, field, fieldIndex) => {
    const updatedFields = (questions[index][field] || []).filter(
      (_, idx) => idx !== fieldIndex
    );
    updateQuestion(index, { [field]: updatedFields });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Questions
      </Typography>
      {questions.length === 0 ? (
        <Typography variant="body1">No questions added yet.</Typography>
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
                  onChange={(e) => handleEditChange(index, "title", e.target.value)}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={question.description || ""}
                  onChange={(e) => handleEditChange(index, "description", e.target.value)}
                />
                {question.type === "matrix" && (
                  <div>
                    <Typography variant="subtitle1">Matrix Rows:</Typography>
                    <List>
                      {question.rows?.map((row, rowIndex) => (
                        <ListItem
                          key={rowIndex}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <TextField
                            variant="outlined"
                            fullWidth
                            value={row}
                            onChange={(e) =>
                              handleEditMatrixField(index, "rows", rowIndex, e.target.value)
                            }
                          />
                          <IconButton
                            onClick={() =>
                              handleDeleteMatrixField(index, "rows", rowIndex)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      onClick={() => handleAddMatrixField(index, "rows")}
                      sx={{ mt: 1 }}
                    >
                      Add Row
                    </Button>

                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      Matrix Columns:
                    </Typography>
                    <List>
                      {question.columns?.map((column, colIndex) => (
                        <ListItem
                          key={colIndex}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <TextField
                            variant="outlined"
                            fullWidth
                            value={column}
                            onChange={(e) =>
                              handleEditMatrixField(index, "columns", colIndex, e.target.value)
                            }
                          />
                          <IconButton
                            onClick={() =>
                              handleDeleteMatrixField(index, "columns", colIndex)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      onClick={() => handleAddMatrixField(index, "columns")}
                      sx={{ mt: 1 }}
                    >
                      Add Column
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
      )}
    </Container>
  );
}

export default QuestionList;
