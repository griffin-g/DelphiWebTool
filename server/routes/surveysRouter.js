var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const { Surveys, Participants, Trackers } = require("../models");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-secret-key"; // Replace with a secure secret key

const verifyToken = async (req, res, next) => {
  console.log("Headers received:", req.headers);

  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader); 

  if (!authHeader) {
    console.log("No authorization header found"); 
    return res.status(401).json({ message: "No token provided" });
  }

  // Check if it's a Bearer token
  if (!authHeader.startsWith("Bearer ")) {
    console.log("Invalid authorization header format"); 
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.surveyAuth = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

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

router.post("/uuid/:uuid", verifyToken, async (req, res, next) => {
  const { uuid } = req.params;
  const { anonymousIdentifier } = req.body;

  if (!anonymousIdentifier) {
    return res.status(400).json({ message: "Missing anonymous identifier" });
  }

  const existingTracker = await Trackers.findOne({
    where: { hashed_participant: anonymousIdentifier, survey_uuid: uuid },
  });

  if (existingTracker) {
    return res
      .status(403)
      .json({ message: "You have already participated in this round." });
  }

  try {
    const survey = await Surveys.findOne({ where: { uuid } });

    if (!survey) {
      console.log("Survey not found in database for UUID:", uuid);
      return res
        .status(404)
        .json({ message: "Survey not found or not published" });
    }

    res.json(survey);
  } catch (error) {
    console.error("Error fetching survey:", error);
    next(error);
  }
});

router.get("/user-surveys/:userID", async (req, res, next) => {
  const { userID } = req.params;
  try {
    const surveys = await Surveys.findAll({
      where: { user_id: userID },
      attributes: ["survey_id", "title", "delphi_round", "elements", "uuid"],
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
    res.status(200).json({ message: "Survey deleted successfully" });
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

router.post("/validate-token", async (req, res) => {
  const { uuid, accessToken, email } = req.body;
  if (!uuid || !accessToken) {
    return res
      .status(400)
      .json({ message: "Participant e-mail and access token are required" });
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

    const participant = await Participants.findOne({
      where: { participant_email: email, survey_id: survey.survey_id },
    });
    if (!participant) {
      return res
        .status(404)
        .json({ message: "Participant not found or email is misspelled" });
    }

    const hashedToken = hashToken(accessToken);
    if (hashedToken !== survey.access_token_hash) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        uuid,
        surveyId: survey.survey_id,
        delphiRound: survey.delphi_round,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error validating token:", error);
    res.status(500).json({
      message: "Error validating token",
      error: error.message,
    });
  }
});

module.exports = router;
