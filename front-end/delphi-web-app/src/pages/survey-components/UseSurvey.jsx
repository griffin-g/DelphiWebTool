import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../AuthProvider";

export const useSurvey = (surveyID) => {
  const [title, setTitle] = useState(""); // Title state
  const [questions, setQuestions] = useState([]);
  const [surveyData, setSurveyData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const fetchedSurveyRef = useRef(false); // To track if survey has been fetched already
  const auth = useAuth();
  // Function to fetch survey data based on surveyID
  const fetchSurvey = async () => {
    if (fetchedSurveyRef.current) return;
    try {
      const response = await axios.get(`http://localhost:3001/surveys/${surveyID}`);
      setTitle(response.data.title);
      setQuestions(response.data.elements);
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
      prevQuestions.map((question, i) =>
        i === index ? updatedQuestion : question
      )
    );
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
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

    // const userID = 1;
    const userID = auth.user.id;
    setSurveyData(surveyData);
    console.log("SurveyJS Format:", JSON.stringify(surveyData, null, 2));

    try {
      const response = await axios.post(
        "http://localhost:3001/surveys/save-survey",
        {
          surveyJSON: surveyData,
          title,
          userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Survey saved successfully:", response.data);
      return response.data;
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
