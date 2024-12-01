import { useState } from "react";

function QuestionList({ questions, onEditQuestion, onDeleteQuestion }) {
  // react states
  const [isEditing, setIsEditing] = useState(null); // tracks question being edited
  const [editTitle, setEditTitle] = useState(""); // title
  const [editDescription, setEditDescription] = useState(""); // question description
  const [editChoices, setEditChoices] = useState([]); // question choices -> ranking, multiple choice, checkboxes 

  // Start editing a question
  const handleEditClick = (index) => {
    setIsEditing(index);
    const question = questions[index];
    setEditTitle(question.title);
    setEditDescription(question.description);
    setEditChoices(question.choices || []);
  };

  // Save the edited question
  const handleSaveClick = (index) => {
    const updatedQuestion = {
      ...questions[index],
      title: editTitle,
      description: editDescription,
      choices: editChoices,
    };
    onEditQuestion(index, updatedQuestion);
    setIsEditing(null);
  };

  // Delete a question
  const handleDeleteClick = (index) => {
    onDeleteQuestion(index);
  };

  return (
    <div>
      <h2>Questions</h2>
      {questions.length === 0 && <p>No questions added yet.</p>}
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {isEditing === index ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit question title"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Edit question description"
                />
                {question.type === "ranking" || question.type === "checkbox" ? (
                  <div>
                    {editChoices.map((choice, idx) => (
                      <div key={idx}>
                        <input
                          type="text"
                          value={choice}
                          onChange={(e) =>
                            setEditChoices(
                              editChoices.map((c, i) =>
                                i === idx ? e.target.value : c
                              )
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
                <button onClick={() => handleSaveClick(index)}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
                <button onClick={() => handleEditClick(index)}>Edit</button>
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
