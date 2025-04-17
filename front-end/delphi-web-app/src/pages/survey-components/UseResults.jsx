import { useState, useEffect, useRef } from "react";
import apiClient from "../../utils/apiClient";
import { useAuth } from "../../AuthProvider";

export const useResults = (surveyUUID, delphiRound, surveyId) => {
  const auth = useAuth();
  const [responses, setResponses] = useState([]);
  const [numResponses, setNumResponses] = useState(0);
  const fetchedSurveyRef = useRef(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  useEffect(() => {
    // if (!fetchedSurveyRef.current && surveyUUID && delphiRound) {
    //   fetchSurveyResults();
    // }
    // return () => {
    //   fetchedSurveyRef.current = false;
    // };
    fetchSurveyResults();
  }, [surveyUUID, delphiRound, surveyId]);

  const transformResponses = async (responseData) => {
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
      const uuid = await getUUID();
      const response = await apiClient.get(
        `/responses/${uuid}/round/${delphiRound}`
      );
      const transformedResponses = await transformResponses(response.data);
      setNumResponses(response.data.length);
      console.log("Transformed responses:", transformedResponses);
      console.log("response from data base:", response.data);
      setResponses({ ...transformedResponses });
      setLastUpdate(Date.now());
      fetchedSurveyRef.current = true;
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const getUUID = async () => {
    try {
      const response = await apiClient.get(
        `/surveys/${surveyId}/round/${delphiRound}`
      );
      return response.data.uuid;
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return { fetchSurveyResults, responses, numResponses };
};
