import { useState, useEffect, useRef } from "react";
import apiClient from "../../utils/apiClient";
import { useAuth } from "../../AuthProvider";

export const useSurvey = (surveyID, delphiRound) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [surveyData, setSurveyData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [inviteList, setInviteList] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [maxRound, setMaxRound] = useState(1);
  const fetchedSurveyRef = useRef(false);
  
  const auth = useAuth();
  // Function to fetch survey data based on surveyID
  const fetchSurvey = async () => {
    //if (fetchedSurveyRef.current) return;
    try {
      const response = await apiClient.get(
        `/surveys/${surveyID}/round/${delphiRound}`
      );
      setTitle(response.data.title);
      setQuestions(response.data.elements);
      setAllQuestions(response.data.elements);
      console.log("all questions:", response.data.elements);
      // Mark as fetched
      fetchedSurveyRef.current = true;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await apiClient.get(
        `/participants/survey-id/${surveyID}`
      );
      setInviteList(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleFindMaxRound = async () => {
    const url = `/surveys/${surveyID}/max-round`;
    try {
      const response = await apiClient.get(url);
      setMaxRound(response.data);
      //return response.data;
    } catch (error) {
      console.error("Error fetching max round:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (surveyID) {
      fetchSurvey();
      console.log("delphi round", delphiRound);
      fetchParticipants();
      handleFindMaxRound();
    }
  }, [surveyID, delphiRound]);

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

  const saveParticipants = async (inviteList, surveyId) => {
    try {
      for (const participant of inviteList) {
        try {
          const response = await apiClient.post("/participants/", {
            participant_email: participant,
            survey_id: surveyId,
          });

          if (response.status === 200) {
            console.log(`Participant ${participant} invited successfully`);
          } else {
            alert(`Failed to invite participant: ${participant}`);
          }
        } catch (error) {
          console.error(`Error inviting participant ${participant}:`, error);
          alert(`Error inviting participant: ${participant}`);
        }
      }
    } catch (error) {
      console.error("Error processing invite list:", error);
      alert("Error processing invite list");
    }
  };

  const handleSaveSurvey = async () => {
    const url = "http://localhost:3001/surveys/save-survey";

    const surveyData = constructSurveyData();
    const userID = auth.user.id;
    setSurveyData(surveyData);

    try {
      const response = await apiClient.post(
        "/surveys/save-survey",
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
      //map through participants here
      console.log("save survey responst", response);
      saveParticipants(inviteList, response.data.survey_id);
    } catch (error) {
      console.error("Error saving survey:", error);
      throw error;
    }
  };

  const handleAddRound = async () => {
    const newRound = maxRound + 1;
    console.log("new round", newRound);
    const userID = auth.user.id;
    try {
      const response = await apiClient.post(
        "/surveys/save-survey/add-round",
        {
          surveyID,
          surveyJSON: {},
          title,
          userID,
          delphi_round: newRound,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error saving survey:", error);
      throw error;
    }
  };

  const handleEditSurvey = async () => {
    const url = "http://localhost:3001/surveys/edit-survey";
    const surveyData = constructSurveyData();

    const userID = auth.user.id;
    setSurveyData(surveyData);
    try {
      const response = await apiClient.put(
        "/surveys/edit-survey",
        {
          surveyID,
          surveyJSON: surveyData,
          title,
          userID,
          delphi_round: delphiRound,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (apiClient.isAxiosError(error)) {
        console.error("Axios error response:", error.response);
        if (error.response) {
          console.error("Axios error status:", error.response.status);
          console.error("Axios error data:", error.response.data);
        }
      }
    }
  };

  const handlePreviewSurvey = () => {
    const surveyData = constructSurveyData();
    console.log("hello");
    console.log(surveyData);
    setSurveyData(surveyData);

    if (surveyData) {
      setShowPreview(!showPreview);
    } else {
      alert("Please save the survey first!");
    }
  };

  const constructSurveyData = () => ({
<<<<<<< HEAD
    elements: questions.map((question) => {
      if (question.type === "html") {
        return {
          type: question.type,
          name: question.name,
          html: question.description || question.html
        };
      }
      
      return {
        type: question.type,
        name: question.name,
        title: question.title,
        description: question.description,
        ...((question.type === "ranking" || question.type === "checkbox") && {
          choices: question.choices,
        }),
        ...(question.type === "rating" && {
          rateMax: question.rateCount ?? 5,
          rateType: question.rateType ?? "numeric"
        }),
      };
    }),
=======
    elements: questions.map((question) => ({
      type: question.type,
      name: question.name,
      title: question.title,
      description: question.description,
      ...((question.type === "ranking" || question.type === "checkbox") && {
        choices: question.choices,
      }),
      ...(question.type === "rating" && {
        rateMax: question.rateCount ?? 5,
        rateType: question.rateType ?? "numeric",
      }),
    })),
>>>>>>> main
  });

  const handleAddInviteList = (newParticipant) => {
    setInviteList((prevInvites) => [...prevInvites, newParticipant]);
  };
  return {
    title,
    setSurveyTitle: setTitle,
    questions,
    surveyData,
    showPreview,
    inviteList,
    maxRound,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveSurvey,
    handleEditSurvey,
    handlePreviewSurvey,
    handleAddInviteList,
    handleAddRound,
    handleFindMaxRound,
  };
};