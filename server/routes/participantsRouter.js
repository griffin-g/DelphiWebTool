var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const { Participants, Surveys } = require("../models");
const { where } = require("sequelize");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allParticipants = await Participants.findAll();
  res.json(allParticipants);
});

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const participant = await Participants.findByPk(req.params.id);
  res.json(participant);
});

router.get("/survey-id/:id", async (req, res, next) => {
  console.log(req.params);
  const survey_id = req.params.id;
  const participant = await Participants.findAll({ where: { survey_id } });
  res.json(participant);
});

router.post("/", async (req, res) => {
  const newParticipant = req.body;
  console.log("Participant", newParticipant);
  await Participants.create(newParticipant);
  res.json(newParticipant);
});

router.delete("/:id", async (req, res) => {
  const participant_id = req.params.id;
  try {
    await Participants.destroy({
      where: {
        participant_id: participant_id,
      },
    });
  } catch (error) {
    console.log("Could not delete participant with id:", participant_id, error);
  }
});

router.delete("/:survey_id/:participant_email", async (req, res) => {
  const { survey_id, participant_email } = req.params;
  console.log("survey_id", survey_id);
  console.log("participant_email", participant_email);

  try {
    const result = await Participants.destroy({
      where: {
        survey_id,
        participant_email,
      },
    });

    if (result > 0) {
      res.json({ success: true, deletedCount: result });
    } else {
      res.status(404).json({
        success: false,
        message: "Participant not found",
      });
    }
  } catch (error) {
    console.error("Could not delete participant:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete participant",
    });
  }
});

router.put("/:id", async (req, res) => {
  const participant_id = req.params.id;
  const updatedParticipant = req.body;
  try {
    await Participants.update(updatedParticipant, {
      where: {
        participant_id: participant_id,
      },
    });
  } catch (error) {
    console.log("Could not update participant with id:", participant_id, error);
  }
});

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "delphiwebapptest@gmail.com",
    pass: "uekx mnhj tbop qcmh ",
  },
});

router.post("/send-invites/:id/:round", async (req, res) => {
  try {
    const survey_id = req.params.id;
    const { accessToken } = req.body;
    const delphi_round = req.params.round;
    const participants = await Participants.findAll({ where: { survey_id } });
    var mailData = {};
    console.log("Participants:", participants);
    const survey = await Surveys.findOne({
      where: {
        survey_id: survey_id,
        delphi_round: delphi_round,
      },
    });
    const uuid = survey.uuid;
    const surveyLink = `https://delphi-web-tool.web.app/access-survey/${uuid}`;

    console.log("Survey link:", surveyLink);
    for (const participant of participants) {
      mailData = {
        from: "delphiwebapptest@gmail.com",
        to: participant.participant_email,
        subject: "You're invited to a Delphi survey!",
        text: "some text",
        html: `
      <p>Dear Participant,</p>
      <p>We hope you're doing well! 🎉</p>
      <p>We’re excited to invite you to participate in an exclusive survey.</b>. Your insights are valuable, and we'd love to hear your thoughts.</p>
      <p><strong>The survey will only take a few minutes, and your responses will make a big impact!</strong></p>
      <p>📝 <a href="${surveyLink}">Click here to take the survey</a></p>
      <P>Access token: ${accessToken}</p>
      <p>If you have any questions, feel free to reach out.</p>
      <p>Thank you in advance for your time and feedback!</p>
      <br>
      <p>Best regards,</p>
      <p>Delphi Web Surveys</p>
    `,
      };

      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          console.log(error);
        }
      });
    }
    return res.status(200).json({
      message: "Invites sent successfully",
    });
  } catch (error) {
    console.error("Error sending invites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
