var express = require("express");
var router = express.Router();
const { Users } = require("../models");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allUsers = await Users.findAll();
  res.json(allUsers);
});

router.get("/:id", async (req, res, next) => {
  console.log(req.params);
  const user = await Users.findByPk(req.params.id);
  res.json(user);
});

router.post("/", async (req, res) => {
  const newUser = req.body;
  console.log("user", newUser);
  await Users.create(newUser);
  res.json(newUser);
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await Users.destroy({
      where: {
        user_id: userId,
      },
    });
  } catch (error) {
    console.log("Could not delete user with id:", userId, error);
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    await Users.update(updatedUser, {
      where: {
        user_id: userId,
      },
    });
  } catch (error) {
    console.log("Could not update user with id:", userId, error);
  }
});

module.exports = router;
