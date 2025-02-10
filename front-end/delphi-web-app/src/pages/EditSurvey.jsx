import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid2,
  Divider,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSurvey } from "./survey-components/UseSurvey";
import QuestionList from "./survey-components/Question-List";
import QuestionForm from "./survey-components/Question-Form";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import RoundSelect from "../Components/RoundSelect";

const EditSurvey = () => {
  const { surveyID, delphiRound } = useParams(); // Get surveyID from the URL params
  const navigate = useNavigate();
  const [selectedDelphiRound, setSelectedDelphiRound] = useState(delphiRound);
  const {
    title,
    questions,
    maxRound,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleEditSurvey,
    handleAddRound,
  } = useSurvey(surveyID, selectedDelphiRound);

  // const [loading, setLoading] = useState(true);
  // const [surveyData, setSurveyData] = useState({
  //   title: "",
  //   questions: [],
  //   handleAddQuestion: () => {},
  //   handleEditQuestion: () => {},
  //   handleDeleteQuestion: () => {},
  //   handleEditSurvey: () => {},
  // });

  // // const fetchSurveyData = async () => {
  // //   try {
  // //     const newSurveyData = await useSurvey(surveyID, selectedDelphiRound); // Ensure useSurvey is async
  // //     setSurveyData(newSurveyData);
  // //   } catch (error) {
  // //     console.error("Error fetching survey data:", error);
  // //   }
  // // };
  // const fetchSurveyData = async () => {
  //   setLoading(true);
  //   const newSurveyData = useSurvey(surveyID, selectedDelphiRound);
  //   setSurveyData(newSurveyData);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchSurveyData();
  // }, [surveyID, selectedDelphiRound]);

  const [questionType, setQuestionType] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [choices, setChoices] = useState([]);
  const [newChoice, setNewChoice] = useState("");

  const addChoice = () => {
    if (newChoice.trim()) {
      setChoices([...choices, newChoice]);
      setNewChoice(""); // Clear the input field after adding a choice
    }
  };

  const handleNewQuestion = () => {
    const newQuestion = {
      type: questionType,
      title: questionTitle,
      description: questionDescription,
      choices,
    };

    const existingQuestion = questions.find(
      (q) =>
        q.title === newQuestion.title &&
        q.description === newQuestion.description
    );
    if (!existingQuestion) {
      handleAddQuestion(newQuestion);
    }

    setQuestionTitle("");
    setQuestionDescription("");
    setChoices([]);
    setNewChoice("");
  };

  const handleDelphiSelect = (event) => {
    setSelectedDelphiRound(event.target.value);
    console.log("selected round", event.target.value);
    navigate(`/edit-survey/${surveyID}/${event.target.value}`);
  };
  console.log("max round", maxRound);

  return (
    <Box>
      <Header />
      <Container
        maxWidth="md"
        sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}
      >
        <Grid2
          container
          direction="row"
          sx={{ justifyContent: "space-between" }}
        >
          <Grid2 container direction="column" sx={{ width: "50%" }}>
            <Typography variant="h4" gutterBottom>
              Edit Survey: {title || "Untitled Survey"}
            </Typography>
          </Grid2>
          <Grid2 width="auto">
            <RoundSelect
              maxRound={maxRound}
              selectedDelphiRound={selectedDelphiRound}
              handleDelphiSelect={handleDelphiSelect}
            />
            <Button
              variant="contained"
              sx={{ height: "56px", marginLeft: "10px" }}
              onClick={() => {
                handleAddRound();
                navigate(`/edit-survey/${surveyID}/${maxRound + 1}`);
              }}
            >
              +
            </Button>
          </Grid2>
        </Grid2>

        <QuestionForm
          questionType={questionType}
          setQuestionType={setQuestionType}
          questionTitle={questionTitle}
          setQuestionTitle={setQuestionTitle}
          questionDescription={questionDescription}
          setQuestionDescription={setQuestionDescription}
          choices={choices}
          newChoice={newChoice}
          setNewChoice={setNewChoice}
          addChoice={addChoice}
        />

        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button variant="contained" onClick={handleNewQuestion}>
            Add Question
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <QuestionList
          questions={questions}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />

        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button variant="contained" onClick={handleEditSurvey}>
            Save Survey
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EditSurvey;
