import { useParams, useNavigate } from "react-router-dom";
import { useSurvey } from "./survey-components/UseSurvey";
import { useState } from "react";
import Header from "../Components/Header";
import { Grid2, Typography } from "@mui/material";
const ResultsSurvey = () => {
  const { surveyID, delphiRound } = useParams();
  const [selectedDelphiRound, setSelectedDelphiRound] = useState(delphiRound);
  const { questions, title } = useSurvey(surveyID, selectedDelphiRound);
  console.log("questions", questions);
  return (
    <div>
      <Header />
      <Grid2 container sx={{ justifyContent: "center", mt: 4 }}>
        <Grid2
          container
          sx={{
            flexDirection: "column",
            height: "auto",
            width: "50%",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          {questions.map((question, index) => {
            return (
              <Grid2
                key={index}
                sx={{
                  border: "2px solid black",
                  p: 1,
                  borderRadius: 5,
                  width: "33%",
                }}
              >
                <h2>{question.title}</h2>
                <p>{question.description}</p>
                {(question.type === "ranking" ||
                  question.type === "checkbox") && (
                  <ul>
                    {question.choices.map((choice, index) => {
                      return <li key={index}>{choice}</li>;
                    })}
                  </ul>
                )}
              </Grid2>
            );
          })}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ResultsSurvey;
