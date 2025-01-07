import PropTypes from 'prop-types';

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
    <div className="question-form">
      <div className="form-group">
        <label>
          Question Type:
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="ranking">Ranking</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </label>
      </div>

      <div className="form-group">
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
      </div>

      <div className="form-group">
        <label>
          Description:
          <input
            type="text"
            placeholder="Enter question description"
            value={questionDescription}
            onChange={(e) => setQuestionDescription(e.target.value)}
          />
        </label>
      </div>

      {(questionType === "ranking" || questionType === "checkbox") && (
        <div className="form-group">
          <label>Choices:</label>
          <div className="choices-input">
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
          <ul className="choices-list">
            {choices.map((choice, index) => (
              <li key={index} className="choice-item">
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

QuestionForm.propTypes = {
  questionType: PropTypes.string.isRequired,
  setQuestionType: PropTypes.func.isRequired,
  questionTitle: PropTypes.string.isRequired,
  setQuestionTitle: PropTypes.func.isRequired,
  questionDescription: PropTypes.string.isRequired,
  setQuestionDescription: PropTypes.func.isRequired,
  choices: PropTypes.array.isRequired,
  newChoice: PropTypes.string.isRequired,
  setNewChoice: PropTypes.func.isRequired,
  addChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
};

export default QuestionForm;
