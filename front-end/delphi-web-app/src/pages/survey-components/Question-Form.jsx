import React from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function QuestionForm({
  questionType,
  setQuestionType,
  questionTitle,
  setQuestionTitle,
  questionDescription,
  setQuestionDescription,
  choices,
  newChoice,
  setNewChoice,
  addChoice,
  deleteChoice,
}) {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}> 
      <Stack spacing={3}>
        <FormControl fullWidth>
        <InputLabel id="question-type-label">Question Type</InputLabel>
        <Select
            labelId="question-type-label"
            value= {questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="ranking">Ranking</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Title"
          placeholder="Enter question title"
          variant="outlined"
          fullWidth
          required
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />

        <TextField
          label="Description"
          placeholder="Enter question description"
          variant="outlined"
          fullWidth
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
        />

        {(questionType === "ranking" || questionType === "checkbox") && (
          <div>
            <FormControl fullWidth>
              <TextField
                label="Choices"
                placeholder="Enter a choice"
                variant="outlined"
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={addChoice}
              disabled={!newChoice.trim()}
              sx={{ mt: 2 }}
            >
              Add Choice
            </Button>
            <List>
              {choices.map((choice, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteChoice(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={choice} />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Stack>
    </Container>
  );
}

export default QuestionForm;
