\# Sprint 5 Report (February 10th to March 17th)

\#\# [https://youtu.be/S050OZ-Efpg](https://youtu.be/S050OZ-Efpg)

\#\# What's New (User Facing)  
 \* Results Exporting  
 \* Results Visualization  
 \* Results Summary and Agreement score

\#\# Work Summary (Developer Facing)

This sprint we accomplished the survey results analysis for our web application. This included adding visualizations of the results in graphs such as bar graphs and pie charts. This visualization is to help the survey admin understand the distribution of the responses from the participants. We also learned how to implement agreement scores such as Kendall's W and Fleiss’s Kappa to understand if the participants are answering in similar ways to each other and developing a consensus.

Administrators are also now able to download the results of their surveys in a CSV format optimized for viewing in Excel. This allows administrators to conduct their own analysis and view the raw results of their surveys. Based on client feedback, the CSV output was adjusted for the “ranking” style questions.

\#\# Unfinished Work

No work went unfinished this sprint. All work that we set out to do was completed. 

\#\# Completed Issues/User Stories  
Here are links to the issues that we completed in this sprint:  
 \* [https://github.com/griffin-g/DelphiWebTool/issues/68](https://github.com/griffin-g/DelphiWebTool/issues/68)   
 \* [https://github.com/griffin-g/DelphiWebTool/issues/71](https://github.com/griffin-g/DelphiWebTool/issues/71)    
 \* [https://github.com/griffin-g/DelphiWebTool/issues/72](https://github.com/griffin-g/DelphiWebTool/issues/72)   
 \* [https://github.com/griffin-g/DelphiWebTool/issues/73](https://github.com/griffin-g/DelphiWebTool/issues/73)   
 \* [https://github.com/griffin-g/DelphiWebTool/issues/77](https://github.com/griffin-g/DelphiWebTool/issues/77)   
 \* [https://github.com/griffin-g/DelphiWebTool/issues/76](https://github.com/griffin-g/DelphiWebTool/issues/76)   
 \* [https://github.com/griffin-g/DelphiWebTool/issues/74](https://github.com/griffin-g/DelphiWebTool/issues/74)   
 \* [https://github.com/griffin-g/DelphiWebTool/issues/78](https://github.com/griffin-g/DelphiWebTool/issues/78) 

\#\# Code Files for Review  
Please review the following code files, which were actively developed during this sprint, for quality:  
 \* \[CSVConverter.jsx\] ([https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/survey-components/CSVConverter.jsx](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/survey-components/CSVConverter.jsx))  
 \* \[ResultsSurvey.jsx\]([https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/ResultsSurvey.jsx](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/ResultsSurvey.jsx))  
 \* \[UseResults.jsx\]([https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/survey-components/UseResults.jsx](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/survey-components/UseResults.jsx))  
 \* \[TextWordCloud.jsx\]([https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/survey-components/TextWordCloud.jsx](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/survey-components/TextWordCloud.jsx))  
 \* \[RankingStatSummary.jsx\](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/Components/RankingStatSummary.jsx)  
 \* \[ResponseDonutChart.jsx\](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/Components/ResponseDonutChart.jsx)  
 \* \[ResponsePieChart.jsx\](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/Components/ResponsePieChart.jsx)  
 \* \[ResultsToggleButton.jsx\](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/Components/ResultsToggleButton.jsx)  
   
\#\# Retrospective Summary  
Here's what went well:  
  \* Implementation overall was smooth and no major hiccups

Here's what we'd like to improve:  
   \* Authorization of participants  
   \* Local storage of survey answers in browser  
     
   
Here are changes we plan to implement in the next sprint:  
   \* Dockerization of product  
   \* Deployment of product  
   \* Deployment of database   
   \* Researching methods of deployment  
   \* Profile page with the ability to change login details