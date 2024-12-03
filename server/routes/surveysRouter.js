var express = require("express");
var router = express.Router();
const { Surveys } = require("../models");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allSurveys = await Surveys.findAll();
  res.json(allSurveys);
});

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const survey = await Surveys.findByPk(req.params.id);
  res.json(survey);
});

router.get("/user-surveys/:userID", async (req, res, next) => {
  const { userID } = req.params;
  try {
    const surveys = await Surveys.findAll({
      where: { user_id: userID },
      attributes: ["survey_id", "title", "delphi_round", "elements"],
    });

    // Log surveys to check if the query is returning data
    console.log("Fetched surveys:", surveys);

    // if (surveys.length === 0) {
    //   return res.status(404).json({ message: "No surveys found for this user" });
    // }

    res.status(200).json(surveys);
  } catch (error) {
    console.error("Error fetching surveys by user:", error);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
});

router.put("/:surveyID", async (req, res) => {
  const { surveyID } = req.params;
  const { elements, delphi_round } = req.body;
  try {
    const survey = await Surveys.findByPk(surveyID);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }
    survey.elements = elements;
    survey.delphi_round = delphi_round;
    await survey.save();
    res.status(200).json({ message: "Survey updated successfully" });
  } catch (error) {
    console.error("Error updating survey:", error);
    res.status(500).json({ error: "Failed to update survey" });
  }
});

// router.post("/", async (req, res) => {
//   const newSurvey = req.body;
//   console.log("user", newSurvey);
//   await Surveys.create(newSurvey);
//   res.json(newSurvey);
// });

router.post("/", async (req, res) => {
  try {
    const { user_id, title, elements, is_active, delphi_round } = req.body;

    const newSurvey = await Surveys.create({
      user_id,
      title,
      elements,
      is_active,
      delphi_round,
    });

    res.status(201).json(newSurvey);
  } catch (error) {
    console.error("Error creating survey:", error);
    res.status(500).send("Error creating survey");
  }
});

router.post("/save-survey", async (req, res) => {
  const { surveyID, surveyJSON, title, userID } = req.body;

  try {
    const newSurvey = await Surveys.create({
      survey_id: surveyID,
      elements: surveyJSON.elements,
      is_active: true,
      delphi_round: 0,
      title: title || "Untitled Survey",
      user_id: userID,
    });

    res.status(201).json(newSurvey);
  } catch (err) {
    console.error("Error saving survey:", err);
    res.status(500).send("Failed to save survey");
  }
});

router.delete("/:id", async (req, res) => {
  const survey_id = req.params.id;
  try {
    await Surveys.destroy({
      where: {
        survey_id: survey_id,
      },
    });
  } catch (error) {
    console.log("Could not delete survey with id:", survey_id, error);
  }
});

router.put("/:id", async (req, res) => {
  const survey_id = req.params.id;
  const updatedSurvey = req.body;
  try {
    await Surveys.update(updatedSurvey, {
      where: {
        survey_id: survey_id,
      },
    });
  } catch (error) {
    console.log("Could not update user with id:", survey_id, error);
  }
});

module.exports = router;
