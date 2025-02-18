var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const { Surveys } = require("../models");
const { v4: uuidv4 } = require("uuid");

function generateSurveyHash(surveyID, salt) {
  const hash = crypto
    .createHmac("sha256", salt)
    .update(surveyID.toString())
    .digest("hex");
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

router.get("/:id/round/:delphi_round", async (req, res, next) => {
  try {
    console.log("get with delphi round", req.params);

    const { id, delphi_round } = req.params;
    console.log("1");
    const survey = await Surveys.findOne({
      where: {
        survey_id: id,
        delphi_round: delphi_round,
      },
    });
    if (!survey) {
      console.log("no survey found");
      return res.status(404).json({ message: "Survey not found" });
    }
    res.json(survey);
  } catch (error) {
    next(error);
  }
});

router.get("/uuid/:uuid", async (req, res, next) => {
  const { uuid } = req.params;
  try {
    console.log("Get with UUID", req.params);
    const survey = await Surveys.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!survey) {
      console.log("no survey found");
      return res.status(404).json({ message: "Survey not found" });
    }
    res.json(survey);
  } catch (error) {
    next(error);
  }
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
  console.log("survey json", surveyJSON);
  try {
    const newSurvey = await Surveys.create({
      survey_id: surveyID,
      elements: surveyJSON.elements,
      is_active: false,
      delphi_round: 1,
      title: title || "Untitled Survey",
      user_id: userID,
    });

    res.status(201).json(newSurvey);
  } catch (err) {
    console.error("Error saving survey:", err);
    res.status(500).send("Failed to save survey");
  }
});

router.post("/save-survey/add-round", async (req, res) => {
  const { surveyID, surveyJSON, title, userID, delphi_round } = req.body;
  try {
    const newSurvey = await Surveys.create({
      survey_id: surveyID,
      elements: [],
      is_active: false,
      delphi_round: delphi_round,
      title: title || "Untitled Survey",
      user_id: userID,
    });

    res.status(201).json(newSurvey);
  } catch (err) {
    console.error("Error saving survey:", err);
    res.status(500).send("Failed to save survey");
  }
});

router.get("/:id/max-round", async (req, res) => {
  const survey_id = req.params.id;
  try {
    const maxRound = await Surveys.max("delphi_round", {
      where: { survey_id },
    });
    res.status(200).json(maxRound);
  } catch (error) {
    console.error("Error fetching max round:", error);
    res.status(500).json({ error: "Failed to fetch max round" });
  }
});

router.put("/edit-survey", async (req, res) => {
  const { surveyID, surveyJSON, title, userID, delphi_round } = req.body;

  try {
    //let survey = await Surveys.findByPk(surveyID);
    const survey = await Surveys.findOne({
      where: {
        survey_id: surveyID,
        delphi_round: delphi_round,
      },
    });
    if (!survey) {
      survey = await Surveys.create({
        survey_id: surveyID,
        elements: surveyJSON.elements,
        title: title || "Untitled Survey",
        user_id: userID,
        is_active: true,
        delphi_round: delphi_round,
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
    console.error("Error updating survey:");
    res.status(500).json({ error: "Failed to update survey" });
  }
});

// Utility function to hash the token
function hashToken(token) {
  const salt = "default_salt"; // Use a salt for extra security
  return crypto.createHmac("sha256", salt).update(token).digest("hex");
}

router.post("/publish/:id/:round", async (req, res) => {
  const { accessToken } = req.body;
  const surveyId = req.params.id;
  const delphi_round = req.params.round;

  if (!accessToken) {
    return res.status(400).json({ message: "Access token is required" });
  }

  try {
    //const uuid = uuidv4();
    const hashedToken = hashToken(accessToken); // Hash the access token

    const existingSurvey = await Surveys.findOne({
      where: {
        survey_id: surveyId,
        delphi_round: delphi_round,
      },
    });
    const uuid = existingSurvey.uuid || uuidv4();
    await Surveys.update(
      {
        is_active: true,
        uuid,
        access_token_hash: hashedToken,
      },
      { where: { survey_id: surveyId, delphi_round: delphi_round } }
    );

    res.status(200).json({
      message: "Survey published successfully",
      url: `/surveys/published/${uuid}`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error publishing survey",
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
});

// validate user ID token
router.post("/validate-token", async (req, res) => {
  const { uuid, accessToken } = req.body;
  if (!uuid || !accessToken) {
    return res
      .status(400)
      .json({ message: "Survey UUID and access token are required" });
  }

  try {
    const survey = await Surveys.findOne({
      where: { uuid },
    });
    if (!survey) {
      return res
        .status(404)
        .json({ message: "Survey not found or not published" });
    }

    const hashedToken = hashToken(accessToken);
    if (hashedToken !== survey.access_token_hash) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    // TODO: Authent token

    res.status(200).json({ publishedURL: survey.url });
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(500).json({
      message: "Error validating token",
      error: error.message,
    });
  }
});

module.exports = router;
