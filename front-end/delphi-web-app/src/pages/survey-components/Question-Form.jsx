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
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
 
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
  rateCount,
  setRateCount,
  rateType,
  setRateType,
}) {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Stack spacing={3}>
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
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="matrix">Matrix</MenuItem>
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
                  <Typography>{choice}</Typography>
                </ListItem>
              ))}
            </List>
          </div>
        )}

        {questionType === "rating" && (
          <div>
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
              value={rateCount}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value > 10) value = 10;
                if (value < 0) value = 0;
            
                setRateCount(value);
              }}              
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="rating-type-label">Rating Type</InputLabel>
              <Select
                labelId="rating-type-label"
                value={rateType}
                onChange={(e) => setRateType(e.target.value)}
              >
                <MenuItem value="numeric">Numeric</MenuItem>
                <MenuItem value="stars">Stars</MenuItem>
                <MenuItem value="smileys">Smileys</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}

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
                  <Typography>{row}</Typography>
                </ListItem>
              ))}
            </List>

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
                  <Typography>{column}</Typography>
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
