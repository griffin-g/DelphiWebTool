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
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  const updateQuestion = (index, changes) => {
    const updatedQuestion = { ...questions[index], ...changes };
    onEditQuestion(index, updatedQuestion);
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
            <ListItem key={index} sx={{ flexDirection: "column", alignItems: "flex-start", mb: 2 }}>
              {question.type === "html" ? (
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    HTML Content Block
                  </Typography>
                  <TextField
                    label="HTML Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={8}
                    value={question.html || ""}
                    onChange={(e) => updateQuestion(index, { html: e.target.value })}
                  />
                  <Typography variant="caption" color="text.secondary">
                    This content will be rendered as HTML in your survey.
                  </Typography>
                  <Button variant="outlined" color="error" onClick={() => onDeleteQuestion(index)}>
                    Delete HTML Block
                  </Button>
                </Stack>
              ) : (
                // Handling for other question types
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Typography variant="subtitle1">
                    Question Type: {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                  </Typography>

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
                              onChange={(e) => {
                                const updatedChoices = [...question.choices];
                                updatedChoices[optionIndex] = e.target.value;
                                updateQuestion(index, { choices: updatedChoices });
                              }}
                            />
                            <IconButton
                              onClick={() =>
                                updateQuestion(index, {
                                  choices: question.choices.filter((_, i) => i !== optionIndex),
                                })
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
                        onClick={() =>
                          updateQuestion(index, { choices: [...(question.choices || []), ""] })
                        }
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
                        inputProps={{ max: 10, min: 1 }}
                        value={question.rateCount || ""}
                        onChange={(e) => updateQuestion(index, { rateCount: e.target.value })}
                        sx={{ mt: 2 }}
                      />
                      <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel>Rating Type</InputLabel>
                        <Select
                          value={question.rateType || "numeric"}
                          onChange={(e) => updateQuestion(index, { rateType: e.target.value })}
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
              )}
              {index < questions.length - 1 && <Divider sx={{ width: "100%", mt: 2 }} />}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default QuestionList;
