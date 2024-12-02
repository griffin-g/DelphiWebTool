import React from "react";

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  // Update question details
  const handleEditChange = (index, field, value) => {
    const updatedQuestion = {
      ...questions[index],
      [field]: value,
    };
    onEditQuestion(index, updatedQuestion);
  };

  // Update choices
  const handleEditChoice = (questionIndex, choiceIndex, value) => {
    const updatedChoices = [...(questions[questionIndex].choices || [])];
    updatedChoices[choiceIndex] = value;

    const updatedQuestion = {
      ...questions[questionIndex],
      choices: updatedChoices,
    };
    onEditQuestion(questionIndex, updatedQuestion);
  };

  // Add a new choice
  const handleAddChoice = (index) => {
    const updatedQuestion = {
      ...questions[index],
      choices: [...(questions[index].choices || []), ""],
    };
    onEditQuestion(index, updatedQuestion);
  };

  // Delete a choice
  const handleDeleteChoice = (questionIndex, choiceIndex) => {
    const updatedChoices = (questions[questionIndex].choices || []).filter(
      (_, idx) => idx !== choiceIndex
    );

    const updatedQuestion = {
      ...questions[questionIndex],
      choices: updatedChoices,
    };
    onEditQuestion(questionIndex, updatedQuestion);
  };

  return (
    <div>
      <h2>Questions</h2>
      {questions.length === 0 && <p>No questions added yet.</p>}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  value={question.title}
                  onChange={(e) => handleEditChange(index, "title", e.target.value)}
                />
              </label>

              <label>
                Description:
                <input
                  type="text"
                  value={question.description}
                  onChange={(e) =>
                    handleEditChange(index, "description", e.target.value)
                  }
                />
              </label>

              {["ranking", "checkbox"].includes(question.type) && (
                <div>
                  <label>Choices:</label>
                  <ul>
                    {question.choices?.map((choice, choiceIndex) => (
                      <li key={choiceIndex}>
                        <input
                          type="text"
                          value={choice}
                          onChange={(e) =>
                            handleEditChoice(index, choiceIndex, e.target.value)
                          }
                        />
                        <button onClick={() => handleDeleteChoice(index, choiceIndex)}>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddChoice(index)}>Add Choice</button>
                </div>
              )}

              <button onClick={() => onDeleteQuestion(index)}>Delete Question</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
