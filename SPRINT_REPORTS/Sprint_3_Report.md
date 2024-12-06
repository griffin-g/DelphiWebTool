# Sprint 3 Report (November 5 - December 5 2024)

## https://youtu.be/9p_sBDnVRDo 

## What's New (User Facing)
 * Survey Creation
 * Survey Saving and Editing
 * Viewing Saved Surveys (Survey Management page)
 * User Log in
 * User profile creation


## Work Summary (Developer Facing)

Most of the work this sprint went towards the front-end look, functionality, and data persistence through the backend. We accomplished this by completing the profile creation and user login interface. The users are also able to be authenticated through JWT tokens that are generated in the backend. Surveys that are created by the user can also be saved once they are completed to the database. The user can then later select a survey to open it up to view its content or edit it.

## Unfinished Work

With the focus on code functionality over design, the UI remains rough around the edges. This work should be relatively simple and quick to complete. 

The participant invitation modal has been created but needs to be implemented in the Create Survey module. 

The final Prototype Draft report remains to be completed, as we were waiting on feedback. The feedback has been received and will be implemented as soon as possible to turn in the report by the due date. 

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:
*https://github.com/users/griffin-g/projects/2/views/1?pane=issue&itemId=87896739&issue=griffin-g%7CDelphiWebTool%7C54 
*https://github.com/users/griffin-g/projects/2/views/1?pane=issue&itemId=87896601&issue=griffin-g%7CDelphiWebTool%7C53
*https://github.com/users/griffin-g/projects/2/views/1?pane=issue&itemId=88184681&issue=griffin-g%7CDelphiWebTool%7C55 
*https://github.com/users/griffin-g/projects/2/views/1?pane=issue&itemId=89943689&issue=griffin-g%7CDelphiWebTool%7C59
*https://github.com/users/griffin-g/projects/2/views/1?pane=issue&itemId=89943738&issue=griffin-g%7CDelphiWebTool%7C61




 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * https://github.com/griffin-g/DelphiWebTool/issues/57 <<We ran out of time with a focus on functionality over design.>>
 * https://github.com/griffin-g/DelphiWebTool/issues/60 <<We needed to wait for feedback before edits were made.>>
 * https://github.com/griffin-g/DelphiWebTool/issues/17 <<A modal has been created but additional work is required to complete this functionality.>>

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * [SurveyManagement.jsx](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/SurveyManagement.jsx) 
 * [Header](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/Components/Header.jsx) 
 * [InviteModal.jsx](https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/Components/InviteModal.jsx)
 * [SurveyButton.jsx] (https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/Components/SurveyButton.jsx)
 * [AuthProvider.jsx] (https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/AuthProvider.jsx)
 * [CreateSurvey.jsx] (https://github.com/griffin-g/DelphiWebTool/blob/main/front-end/delphi-web-app/src/pages/CreateSurvey.jsx) 


## Retrospective Summary
Here's what went well:
  * Development of frontend based on Figma design
  * Quickly pivoting the database design based off of the implementation
  * Task tracking on GitHub
 
Here's what we'd like to improve:
   * User Interface and User Experience
   * Error catching
   * User privacy
  
Here are changes we plan to implement in the next sprint:
   * Ability for the invite modal to send links to emails once surveys are completed
   * Automated testing
   * Protected API routes

