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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  const updateQuestion = (index, changes) => {
    const updatedQuestion = { ...questions[index], ...changes };
    onEditQuestion(index, updatedQuestion);
  };

  const handleEditChoice = (index, choiceIndex, value) => {
    const updatedChoices = [...(questions[index].choices || [])];
    updatedChoices[choiceIndex] = value;
    updateQuestion(index, { choices: updatedChoices });
  };

  const handleAddChoice = (index) => {
    const updatedChoices = [...(questions[index].choices || []), ""];
    updateQuestion(index, { choices: updatedChoices });
  };

  const handleDeleteChoice = (index, choiceIndex) => {
    const updatedChoices = (questions[index].choices || []).filter((_, i) => i !== choiceIndex);
    updateQuestion(index, { choices: updatedChoices });
  };

  const handleEditRateCount = (index, value) => {
    updateQuestion(index, { rateCount: value });
  };

  const handleEditRateType = (index, value) => {
    updateQuestion(index, { rateType: value });
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
                      {question.choices?.map((choice, optionIndex) => (
                        <ListItem key={optionIndex} sx={{ display: "flex", alignItems: "center" }}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            value={choice}
                            onChange={(e) => handleEditChoice(index, optionIndex, e.target.value)}
                          />
                          <IconButton onClick={() => handleDeleteChoice(index, optionIndex)}>
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
                      Add Option
                    </Button>
                  </div>
                )}

                {question.type === "rating" && (
                  <div>
                    <Typography variant="subtitle1">Rating Configuration:</Typography>
                    <TextField
                      label="Max Rating"
                      placeholder="Enter max rating (e.g., 10)"
                      variant="outlined"
                      fullWidth
                      type="number"
                      slotProps={{
                        htmlInput: { 
                          max: 10, 
                          min: 0 
                        }
                      }}
                      value={question.rateCount || ""}
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        if (value > 10) value = 10;
                        if (value < 0) value = 0;

                        handleEditRateCount(index, value);
                      }}
                      sx={{ mt: 2 }}
                    />
                    <FormControl fullWidth sx={{ mt: 1 }}>
                      <InputLabel id={`rating-type-label-${index}`}>Rating Type</InputLabel>
                      <Select
                        labelId={`rating-type-label-${index}`}
                        value={question.rateType || "numeric"}
                        onChange={(e) => handleEditRateType(index, e.target.value)}
                      >
                        <MenuItem value="numeric">Numeric</MenuItem>
                        <MenuItem value="stars">Stars</MenuItem>
                        <MenuItem value="smileys">Smileys</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                )}

                <Button variant="outlined" color="error" onClick={() => onDeleteQuestion(index)}>
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