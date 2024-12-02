function QuestionForm({
  questionType,
  setQuestionType,
  questionTitle,
  setQuestionTitle,
  questionDescription,
  setQuestionDescription,
  choices,
  setChoices,
  newChoice,
  setNewChoice,
  addChoice,
  deleteChoice,
}) {
  return (
    <div>
      {/* Select question type */}
      <label>
        Question Type:
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="ranking">Ranking</option>
          <option value="checkbox">Checkbox</option>
          {/* Add other question types as needed */}
        </select>
      </label>

      {/* Input for question title */}
      <label>
        Title:
        <input
          type="text"
          placeholder="Enter question title"
          value={questionTitle}
          required
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
      </label>

      {/* Input for question description */}
      <label>
        Description:
        <input
          type="text"
          placeholder="Enter question description"
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
        />
      </label>

      {/* Choices input for specific question types */}
      {(questionType === "ranking" || questionType === "checkbox") && (
        <div>
          <label>Choices:</label>
          <div>
            <input
              type="text"
              placeholder="Enter a choice"
              value={newChoice}
              onChange={(e) => setNewChoice(e.target.value)}
            />
            <button onClick={addChoice} disabled={!newChoice.trim()}>
              Add Choice
            </button>
          </div>
          <ul>
            {choices.map((choice, index) => (
              <li key={index}>
                {choice}
                <button onClick={() => deleteChoice(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuestionForm;
