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

router.post("/", async (req, res) => {
  const newSurvey = req.body;
  console.log("user", newSurvey);
  await Surveys.create(newSurvey);
  res.json(newSurvey);
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
