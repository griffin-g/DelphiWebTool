var express = require("express");
var router = express.Router();
const { Responses } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const allResponses = await Responses.findAll();
    res.json(allResponses);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await Responses.findByPk(req.params.id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { survey_uuid, delphi_round, response_data } = req.body;

    console.log("Received payload:", { survey_uuid, delphi_round, response_data });

    const newResponse = await Responses.create({
      survey_uuid,
      delphi_round,
      response_data,
    });

    res.json(newResponse);
  } catch (error) {
    console.error("Error creating response:", error);
    next(error);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const response_id = req.params.id;
    await Responses.destroy({
      where: {
        response_id: response_id,
      },
    });
    res.json({ message: "Response deleted successfully" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response_id = req.params.id;
    const updatedResponse = req.body;
    await Responses.update(updatedResponse, {
      where: {
        response_id: response_id,
      },
    });
    res.json({ message: "Response updated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
