var express = require("express");
var router = express.Router();
const { Questions } = require("../models");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allQuestions = await Questions.findAll();
  res.json(allQuestions);
});

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const question = await Questions.findByPk(req.params.id);
  res.json(question);
});

router.post("/", async (req, res) => {
  const newQuestion = req.body;
  console.log("user", newQuestion);
  await Questions.create(newQuestion);
  res.json(newQuestion);
});

router.delete("/:id", async (req, res) => {
  const question_id = req.params.id;
  try {
    await Questions.destroy({
      where: {
        question_id: question_id,
      },
    });
  } catch (error) {
    console.log("Could not delete question with id:", question_id, error);
  }
});

router.put("/:id", async (req, res) => {
  const question_id = req.params.id;
  const updatedQuestion = req.body;
  try {
    await Questions.update(updatedQuestion, {
      where: {
        question_id: question_id,
      },
    });
  } catch (error) {
    console.log("Could not update question with id:", question_id, error);
  }
});

module.exports = router;
