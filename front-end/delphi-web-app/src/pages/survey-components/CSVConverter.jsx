import React from "react";
import { Button } from "@mui/material";

const convertResponsesToCSV = (responses, questions) => {
  if (!responses || Object.keys(responses).length === 0) return "";

  const csvLines = [];
  const questionMap = questions.reduce((acc, question) => {
    acc[question.name] = question;
    return acc;
  }, {});

  Object.keys(responses).forEach(questionKey => {
    const question = questionMap[questionKey] || { title: questionKey };
    const responseData = responses[questionKey];
    
    if (!responseData || responseData.length === 0) return;
    
    if (question.type === "ranking" && responseData.length > 0 && Array.isArray(responseData[0])) {
      let rankingOptions = [];
      for (const response of responseData) {
        if (Array.isArray(response) && response.length > 0) {
          rankingOptions = [...response];
          break;
        }
      }
      
      if (rankingOptions.length === 0) return;
      
      rankingOptions.sort();
      
      const headers = [`"${question.title || questionKey}"`].concat(
        rankingOptions.map(option => `"${option}"`)
      ).join(",");
      csvLines.push(headers);
      
      responseData.forEach(response => {
        if (!Array.isArray(response) || response.length === 0) {
          const emptyRow = ["\"\""].concat(rankingOptions.map(() => "\"\"")).join(",");
          csvLines.push(emptyRow);
          return;
        }
        
        const rankMap = {};
        response.forEach((option, index) => {
          rankMap[option] = index + 1;
        });
        
        const row = [`"${question.title || questionKey}"`].concat(
          rankingOptions.map(option => `"${rankMap[option] || ""}"`).join(",")
        ).join(",");
        csvLines.push(row);
      });
      
      csvLines.push("");
    } else {
      const headers = `"${question.title || questionKey}"`;
      csvLines.push(headers);
      
      responseData.forEach(response => {
        let value = response;
        
        if (value === undefined) {
          csvLines.push('""');
          return;
        }
        
        if (Array.isArray(value) && value.length > 0) {
          csvLines.push(`"${value.join(', ')}"`);
        } else if (typeof value === "string") {
          csvLines.push(`"${value}"`);
        } else {
          csvLines.push(`"${value}"`);
        }
      });
      
      csvLines.push("");
    }
  });
  
  return csvLines.join("\n");
};

const downloadCSV = (csvContent, filename = "survey_responses.csv") => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("style", "display: none");
  document.body.appendChild(link);
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