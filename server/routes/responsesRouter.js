var express = require("express");
var router = express.Router();
const { Responses } = require("../models");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allResponses = await Responses.findAll();
  res.json(allResponses);
});

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const response = await Responses.findByPk(req.params.id);
  res.json(response);
});

router.post("/", async (req, res) => {
  const newResponse = req.body;
  console.log("user", newResponse);
  await Responses.create(newResponse);
  res.json(newResponse);
});

router.delete("/:id", async (req, res) => {
  const response_id = req.params.id;
  try {
    await Responses.destroy({
      where: {
        response_id: response_id,
      },
    });
  } catch (error) {
    console.log("Could not delete question with id:", response_id, error);
  }
});

router.put("/:id", async (req, res) => {
  const response_id = req.params.id;
  const updatedResponse = req.body;
  try {
    await Responses.update(updatedResponse, {
      where: {
        response_id: response_id,
      },
    });
  } catch (error) {
    console.log("Could not update question with id:", response_id, error);
  }
});

module.exports = router;
