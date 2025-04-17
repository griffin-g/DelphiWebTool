import { useState, useEffect, useRef } from "react";
import apiClient from "../../utils/apiClient";
import { useAuth } from "../../AuthProvider";

export const useResults = (surveyUUID, delphiRound) => {
  const auth = useAuth();
  const [responses, setResponses] = useState([]);
  const [numResponses, setNumResponses] = useState(0);
  const fetchedSurveyRef = useRef(false);

  useEffect(() => {
    // if (!fetchedSurveyRef.current && surveyUUID && delphiRound) {
    //   fetchSurveyResults();
    // }
    // return () => {
    //   fetchedSurveyRef.current = false;
    // };
    fetchSurveyResults();
  }, [surveyUUID, delphiRound]);

  const transformResponses = (responseData) => {
    const transformedData = {};

    responseData.forEach((response) => {
      Object.entries(response).forEach(([questionId, answer]) => {
        if (!transformedData[questionId]) {
          transformedData[questionId] = [];
        }
        transformedData[questionId].push(answer);
      });
    });

    return transformedData;
  };

  const fetchSurveyResults = async () => {
    try {
      const response = await apiClient.get(
        `/responses/${surveyUUID}/round/${delphiRound}`
      );
      const transformedResponses = transformResponses(response.data);
      setNumResponses(response.data.length);
      setResponses(transformedResponses);
      fetchedSurveyRef.current = true;
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return { fetchSurveyResults, responses, numResponses };
};
