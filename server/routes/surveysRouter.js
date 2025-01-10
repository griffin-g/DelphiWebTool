var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const { Surveys } = require("../models");

function generateSurveyHash(surveyID, salt) {
  const hash = crypto.createHmac("sha256", salt).update(surveyID.toString()).digest("hex");
  return hash;
}

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

router.put("/edit-survey", async (req, res) => {
  const { surveyID, surveyJSON, title, userID } = req.body;

  try {

    let survey = await Surveys.findByPk(surveyID);
    if (!survey) {
      survey = await Surveys.create({
        survey_id: surveyID,
        elements: surveyJSON.elements,
        title: title || "Untitled Survey",
        user_id: userID,
        is_active: true,
        delphi_round: 0,
      });
    } else {
      survey.elements = surveyJSON.elements;
      survey.title = title || survey.title;
      await survey.save();
    }

    res.status(200).json(survey);
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
  const { elements, delphi_round, ...updatedFields } = req.body;

  try {
    const survey = await Surveys.findByPk(survey_id);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    await Surveys.update(
      { elements, delphi_round, ...updatedFields },
      { where: { survey_id } }
    );

    res.status(200).json({ message: "Survey updated successfully" });
  } catch (error) {
    console.error("Error updating survey:",);
    res.status(500).json({ error: "Failed to update survey" });
  }
});

// publish hashed survey with salt
router.post("/publish/:id", async (req, res) => {
  try {
    const surveyId = req.params.id;
    const salt = "default_salt"; // TODO: Change at a later date or randomize
    const hash = generateSurveyHash(surveyId, salt);

    await Surveys.update(
      { is_published: true, hash },
      { where: { survey_id: surveyId } }
    );

    res.status(200).json({ message: "Survey published successfully", url: `/surveys/published/${hash}` });
  } catch (error) {
    res.status(500).json({ message: "Error publishing survey", error });
  }
});

module.exports = router;
