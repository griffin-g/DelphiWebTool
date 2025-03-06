import { useParams, useNavigate } from "react-router-dom";
import { useSurvey } from "./survey-components/UseSurvey";
import { useState } from "react";
import Header from "../Components/Header";
import { Grid2, Typography } from "@mui/material";
import { useResults } from "./survey-components/UseResults";
import { ResponseBarChart } from "../Components/BarChart";
import { ResponsePieChart } from "../Components/ResponsePieChart";
const ResultsSurvey = () => {
  const { surveyID, delphiRound, surveyUUID } = useParams();
  const [selectedDelphiRound, setSelectedDelphiRound] = useState(delphiRound);
  const { questions, title } = useSurvey(surveyID, selectedDelphiRound);
  console.log("questions", questions);
  const { fetchSurveyResults, responses, numResponses } = useResults(
    surveyUUID,
    selectedDelphiRound
  );
  console.log("responses", responses);
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
          <Typography variant="h6" gutterBottom>
            Responses: {numResponses}
          </Typography>
          {questions.map((question, index) => {
            return (
              <Grid2
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Grid2
                  key={index}
                  sx={{
                    border: "1px solid black",
                    boxShadow: 1,
                    p: 1,
                    borderRadius: 3,
                    width: "33%",
                    mb: 2,
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
                <Grid2
                  sx={{
                    border: "2px solid black",
                    p: 1,
                    borderRadius: 3,
                    width: "60%",
                    mb: 2,
                  }}
                >
                  {question.type === "checkbox" && (
                    <ResponseBarChart
                      labels={question.choices}
                      responses={responses[question.name]}
                      type="checkbox"
                    />
                  )}
                  {question.type === "ranking" && (
                    <ResponseBarChart
                      labels={question.choices}
                      responses={responses[question.name]}
                      type="ranking"
                    />
                    /* <ResponsePieChart
                        responses={responses[question.name]}
                        labels={question.choices}
                      /> */
                  )}
                </Grid2>
              </Grid2>
            );
          })}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ResultsSurvey;
