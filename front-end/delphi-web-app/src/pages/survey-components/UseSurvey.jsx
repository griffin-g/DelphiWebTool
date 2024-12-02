import { useState, useEffect, useRef } from "react";

export const useSurvey = (surveyID) => {
  const [title, setTitle] = useState(""); // Title state
  const [questions, setQuestions] = useState([]);
  const [surveyData, setSurveyData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const fetchedSurveyRef = useRef(false); // To track if survey has been fetched already

  // Function to fetch survey data based on surveyID
  const fetchSurvey = async () => {
    if (fetchedSurveyRef.current) return;
    try {
      const response = await fetch(`http://localhost:3001/surveys/${surveyID}`);
      if (!response.ok) throw new Error("Failed to fetch survey");

      const data = await response.json();
      setTitle(data.title);
      setQuestions(data.elements);
      // Mark as fetched
      fetchedSurveyRef.current = true;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (surveyID) {
      fetchSurvey(); // Fetch data when surveyID is available
    }
  }, [surveyID]); // Fetch data only when surveyID changes

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleEditQuestion = (index, updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) => (i === index ? updatedQuestion : question))
    );
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  const handleSaveSurvey = async () => {
    const surveyData = {
      elements: questions.map((question) => ({
        type: question.type,
        name: question.name,
        title: question.title,
        description: question.description,
        ...((question.type === "ranking" || question.type === "checkbox") && {
          choices: question.choices,
        }),
      })),
    };

    const userID = 1;

    setSurveyData(surveyData);
    console.log("SurveyJS Format:", JSON.stringify(surveyData, null, 2));

    try {
      const response = await fetch("http://localhost:3001/surveys/save-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          surveyJSON: surveyData,
          title,
          userID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save survey");
      }

      const data = await response.json();
      console.log("Survey saved successfully:", data);
      return data;
    } catch (error) {
      console.error("Error saving survey:", error);
      throw error;
    }
  };

  const handlePreviewSurvey = () => {
    const surveyData = {
      elements: questions.map((question) => ({
        type: question.type,
        name: question.name,
        title: question.title,
        description: question.description,
        ...((question.type === "ranking" || question.type === "checkbox") && {
          choices: question.choices,
        }),
      })),
    };

    setSurveyData(surveyData);

    if (surveyData) {
      setShowPreview(!showPreview);
    } else {
      alert("Please save the survey first!");
    }
  };

  return {
    title,
    setSurveyTitle: setTitle,
    questions,
    surveyData,
    showPreview,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveSurvey,
    handlePreviewSurvey,
  };
};
