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
  }) {
    return (
      <div>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          <option value="text">Text</option>
          <option value="ranking">Ranking</option>
          <option value="checkbox">Checkbox</option>
          {/* Add other question types as needed */}
        </select>
  
        <input
          type="text"
          placeholder="Enter question title"
          value={questionTitle}
          required
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
  
        <input
          type="text"
          placeholder="Enter question description"
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
        />
  
        {(questionType === "ranking" || questionType === "checkbox") && (
          <div>
            <input
              type="text"
              placeholder="Enter choice"
              value={newChoice}
              onChange={(e) => setNewChoice(e.target.value)}
            />
            <button onClick={addChoice}>Add Choice</button>
            <ul>
              {choices.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  export default QuestionForm;
  