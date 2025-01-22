var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const { Participants } = require("../models");
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

router.post("/send-invites/:id", async (req, res) => {
  const survey_id = req.params.id;
  const participants = await Participants.findAll({ where: { survey_id } });
  var mailData = {};
  for (const participant of participants) {
    mailData = {
      from: "delphiwebapptest@gmail.com",
      to: participant.participant_email,
      subject: "Invite to Delphi Web App Survey",
      text: "some text",
      html: "<b>Hello!<b>",
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }
});

module.exports = router;
