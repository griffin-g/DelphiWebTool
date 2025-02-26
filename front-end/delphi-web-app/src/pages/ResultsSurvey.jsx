import { useParams, useNavigate } from "react-router-dom";
const ResultsSurvey = () => {
  const { surveyID, delphiRound } = useParams();
  return (
    <div>
      <h1>Results Survey</h1>
    </div>
  );
};

export default ResultsSurvey;
