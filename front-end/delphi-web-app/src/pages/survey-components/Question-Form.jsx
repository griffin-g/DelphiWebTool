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
  rows,
  newRow,
  setNewRow,
  addRow,
  deleteRow,
  columns,
  newColumn,
  setNewColumn,
  addColumn,
  deleteColumn,
}) {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
        {/* Question Type Dropdown */}
        <FormControl fullWidth>
          <InputLabel id="question-type-label">Question Type</InputLabel>
          <Select
            labelId="question-type-label"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="ranking">Ranking</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
            <MenuItem value="matrix">Matrix</MenuItem>
          </Select>
        </FormControl>

        {/* Question Title */}
        <TextField
          label="Title"
          placeholder="Enter question title"
          variant="outlined"
          fullWidth
          required
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />

        {/* Question Description */}
        <TextField
          label="Description"
          placeholder="Enter question description"
          variant="outlined"
          fullWidth
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
        />

        {/* Choices for Ranking or Checkbox */}
        {(questionType === "ranking" || questionType === "checkbox") && (
          <div>
            <TextField
              label="Choices"
              placeholder="Enter a choice"
              variant="outlined"
              value={newChoice}
              onChange={(e) => setNewChoice(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={addChoice}
              disabled={!newChoice?.trim()}
              sx={{ mt: 2 }}
            >
              Add Choice
            </Button>
            <List>
              {choices?.map((choice, index) => (
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

        {/* Matrix Question Configuration */}
        {questionType === "matrix" && (
          <div>
            {/* Rows */}
            <TextField
              label="Row"
              placeholder="Enter a row label"
              variant="outlined"
              value={newRow}
              onChange={(e) => setNewRow(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={addRow}
              disabled={!newRow?.trim()}
              sx={{ mt: 2 }}
            >
              Add Row
            </Button>
            <List>
              {rows?.map((row, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteRow(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={row} />
                </ListItem>
              ))}
            </List>

            {/* Columns */}
            <TextField
              label="Column"
              placeholder="Enter a column label"
              variant="outlined"
              value={newColumn}
              onChange={(e) => setNewColumn(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={addColumn}
              disabled={!newColumn?.trim()}
              sx={{ mt: 2 }}
            >
              Add Column
            </Button>
            <List>
              {columns?.map((column, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteColumn(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={column} />
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
