import React, { useState } from "react";
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
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
 
function QuestionForm({
  questionType,
  setQuestionType,
  questionTitle,
  setQuestionTitle,
  questionDescription,
  setQuestionDescription,
  htmlContent,
  setHtmlContent,
  choices,
  newChoice,
  setNewChoice,
  addChoice,
  deleteChoice,
  rateCount,
  setRateCount,
  rateType,
  setRateType,
}) {
  const [htmlError, setHtmlError] = useState(false);

  const validateHtml = (content) => {
    const scriptTagPattern = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
    return scriptTagPattern.test(content);
  };

  const handleHtmlChange = (e) => {
    const content = e.target.value;
    setHtmlContent(content);
    setHtmlError(validateHtml(content));
  };

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
            <MenuItem value="html">HTML Content</MenuItem>
          </Select>
        </FormControl>
  
        {questionType === "html" ? (
          <>
            <Typography variant="subtitle1">HTML Content Block</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Use this to display rich text, images, or custom formatting. Avoid including scripts.
            </Typography>
            <TextField
              label="HTML Content"
              placeholder="Enter valid HTML"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={htmlContent || ""}
              onChange={handleHtmlChange}
              error={htmlError}
              helperText={htmlError ? "Invalid HTML: Script tags are not allowed." : ""}
            />
            {htmlError && <Alert severity="error">Remove any script tags from your HTML.</Alert>}
          </>
        ) : (
          <>
            <TextField
              label="Title"
              placeholder="Enter question title"
              variant="outlined"
              fullWidth
              required
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              sx={{ mt: 2 }}
            />

            <TextField
              label="Description"
              placeholder="Enter question description"
              variant="outlined"
              fullWidth
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
              sx={{ mt: 2 }}
            />

            {questionType === "ranking" || questionType === "checkbox" ? (
              <>
                <TextField
                  label="Choices"
                  placeholder="Enter a choice"
                  variant="outlined"
                  value={newChoice}
                  onChange={(e) => setNewChoice(e.target.value)}
                  fullWidth
                  sx={{ mt: 2 }}
                />
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
                      <Typography>{choice}</Typography>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : null}

            {questionType === "rating" && (
              <>
                <TextField
                  label="Max Rating"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={rateCount}
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value > 10) value = 10;
                    if (value < 1) value = 1;
                    setRateCount(value);
                  }}
                  sx={{ mt: 2 }}
                  helperText="Enter a number between 1 and 10"
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
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}

export default QuestionForm;