var express = require("express");
var router = express.Router();
const { Answers } = require("../models");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allAnswers = await Answers.findAll();
  res.json(allAnswers);
});

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const answer = await Answers.findByPk(req.params.id);
  res.json(answer);
});

router.post("/", async (req, res) => {
  const newAnswer = req.body;
  console.log("answer", newAnswer);
  await Answers.create(newAnswer);
  res.json(newAnswer);
});

router.delete("/:id", async (req, res) => {
  const answer_id = req.params.id;
  try {
    await Answers.destroy({
      where: {
        answer_id: answer_id,
      },
    });
  } catch (error) {
    console.log("Could not delete question with id:", answer_id, error);
  }
});

router.put("/:id", async (req, res) => {
  const answer_id = req.params.id;
  const updatedAnswer = req.body;
  try {
    await Answers.update(updatedAnswer, {
      where: {
        answer_id: answer_id,
      },
    });
  } catch (error) {
    console.log("Could not update answer with id:", answer_id, error);
  }
});

module.exports = router;
