import React from "react";
import { Button } from "@mui/material";

const convertResponsesToCSV = (responses, questions) => {
  if (!responses || Object.keys(responses).length === 0) return "";

  // title of question
  const questionMap = questions.reduce((acc, question) => {
    acc[question.name] = question.title;
    return acc;
  }, {});

  const questionKeys = Object.keys(responses);
  const headers = questionKeys.map(key => `"${questionMap[key] || key}"`).join(",");

  const numResponses = Math.max(...questionKeys.map(key => responses[key].length));

  const rows = Array.from({ length: numResponses }, (_, index) => {
    return questionKeys.map(key => {
      let value = responses[key][index];

      if (value === undefined) {
        return '""';
      }

      if (Array.isArray(value)) {

        const rankingPositions = value
          .map((item, idx) => ({ item, idx }))
          .sort((a, b) => a.item - b.item) 
          .map((sorted, rankIdx) => ({
            item: sorted.item,
            rank: rankIdx + 1 
          }));

        const rankingColumns = rankingPositions.map((rankedItem) => 
          `"${rankedItem.rank}"`).join(",");
        return rankingColumns;
      } else if (typeof value === "string") {
        value = `"${value}"`;
      }
      return value;
    }).join(",");
  });

  return [headers, ...rows].join("\n");
};

const downloadCSV = (csvContent, filename = "survey_responses.csv") => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 100);
};

const CSVConverter = ({ responses, questions }) => {
  const handleDownload = () => {
    if (!responses || Object.keys(responses).length === 0) {
      console.warn("No responses available for download.");
      return;
    }
    const csvContent = convertResponsesToCSV(responses, questions);
    downloadCSV(csvContent);
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleDownload}
      disabled={!responses || Object.keys(responses).length === 0}
    >
      Download CSV
    </Button>
  );
};

export default CSVConverter;
