import { useParams, useNavigate } from "react-router-dom";
import { useSurvey } from "./survey-components/UseSurvey";
import { useState } from "react";
import Header from "../Components/Header";
import { Button, Grid2, Typography } from "@mui/material";
import { useResults } from "./survey-components/UseResults";
import { ResponseBarChart } from "../Components/BarChart";
import CSVConverter from "./survey-components/CSVConverter";
import TextWordCloud from "./survey-components/TextWordCloud";
import { ResponsePieChart } from "../Components/ResponsePieChart";
import { RankingStatSummary } from "../Components/RankingStatSummary";
import ResultsToggleButton from "../Components/ResultsToggleButton";
import { ResponseDonutChart } from "../Components/ResponseDonutChart";
import RoundSelect from "../Components/RoundSelect";

const ResultsSurvey = () => {
  const { surveyID, delphiRound, surveyUUID } = useParams();

  const navigate = useNavigate();
  const [selectedDelphiRound, setSelectedDelphiRound] = useState(delphiRound);
  const { questions, title } = useSurvey(surveyID, selectedDelphiRound);
  const [viewModes, setViewModes] = useState({});
  console.log("selectedDelphiRound:", selectedDelphiRound);
  const { fetchSurveyResults, responses, numResponses } = useResults(
    surveyUUID,
    selectedDelphiRound
  );
  const { maxRound } = useSurvey(surveyID, selectedDelphiRound);

  const handleRoundChange = async (event) => {
    const newRound = event.target.value;
    setSelectedDelphiRound(newRound);
    console.log("newRound:", newRound);
    setViewModes({});
    navigate(`/results-survey/${surveyID}/${newRound}/${surveyUUID}`);
  };

  const handleChange = (questionId, event, nextView) => {
    setViewModes((prev) => ({
      ...prev,
      [questionId]: nextView,
    }));
  };

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
          <Grid2
            container
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Grid2 item>
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>
              <CSVConverter responses={responses} questions={questions} />
              <Typography variant="h6" gutterBottom>
                Responses: {numResponses}
              </Typography>
            </Grid2>
            <Grid2 item>
              <RoundSelect
                maxRound={maxRound}
                selectedDelphiRound={selectedDelphiRound}
                handleDelphiSelect={handleRoundChange}
              />
            </Grid2>
          </Grid2>

          {questions.map((question, index) => {
            const currentViewMode = viewModes[question.name] || "graphs";
            return (
              <Grid2
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  minWidth: "1000px",
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
                    border: "1px solid black",
                    boxShadow: 1,
                    borderRadius: 3,
                    width: "60%",
                    mb: 2,
                  }}
                >
                  {question.type === "text" && (
                    <TextWordCloud responses={responses[question.name]} />
                  )}
                  {question.type === "checkbox" && (
                    <Grid2
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <ResultsToggleButton
                        viewMode={currentViewMode}
                        handleChange={(event, nextView) =>
                          handleChange(question.name, event, nextView)
                        }
                      />
                      {currentViewMode === "graphs" ? (
                        <>
                          <Grid2 sx={{ width: "50%", maxHeight: "100%" }}>
                            <ResponseBarChart
                              labels={question.choices}
                              responses={responses[question.name]}
                              type="checkbox"
                            />
                          </Grid2>
                          <Grid2 sx={{ width: "40%" }}>
                            <ResponseDonutChart
                              responses={responses[question.name]}
                              labels={question.choices}
                            />
                          </Grid2>
                        </>
                      ) : (
                        <Grid2 sx={{ width: "90%", p: 2 }}>
                          {question.type === "checkbox" && (
                            <RankingStatSummary
                              labels={question.choices}
                              responses={responses[question.name]}
                              type="checkbox"
                            />
                          )}
                        </Grid2>
                      )}
                    </Grid2>
                  )}
                  {question.type === "ranking" && (
                    <Grid2
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <ResultsToggleButton
                        viewMode={currentViewMode}
                        handleChange={(event, nextView) =>
                          handleChange(question.name, event, nextView)
                        }
                      />
                      {currentViewMode === "graphs" ? (
                        <>
                          <Grid2 sx={{ width: "50%", maxHeight: "100%" }}>
                            <ResponseBarChart
                              labels={question.choices}
                              responses={responses[question.name]}
                              type="ranking"
                            />
                          </Grid2>
                          <Grid2 sx={{ width: "40%" }}>
                            <ResponsePieChart
                              responses={responses[question.name]}
                              labels={question.choices}
                            />
                          </Grid2>
                        </>
                      ) : (
                        <Grid2 sx={{ width: "90%", p: 2 }}>
                          {question.type === "checkbox" && (
                            <RankingStatSummary
                              labels={question.choices}
                              responses={responses[question.name]}
                              type="checkbox"
                            />
                          )}
                          {question.type === "ranking" && (
                            <>
                              <RankingStatSummary
                                labels={question.choices}
                                responses={responses[question.name]}
                                type="ranking"
                              />
                            </>
                          )}
                        </Grid2>
                      )}
                    </Grid2>
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
