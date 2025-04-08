var express = require("express");
var router = express.Router();
const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {verifyToken} = require("../middleware/verifyToken");

const JWT_SECRET = "your-secret-key"; // Replace with a secure secret key
/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allUsers = await Users.findAll();
  res.json(allUsers);
});

router.get("/user-id/:id", async (req, res, next) => {
  console.log(req.params);
  const user = await Users.findByPk(req.params.id);
  res.json(user);
});

router.post("/email", async (req, res, next) => {
  console.log(req.body);
  email = req.body.email;
  password = req.body.password;
  try {
    const user = await Users.findOne({
      where: { email: email, password_hash: password }, // Condition to match email
    });

    if (user) {
      console.log("User found:", user.toJSON());
      res.json(user);
      return user;
    } else {
      console.log("No user found with this email.");
      return null;
    }
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, email: user.email, first_name: user.first_name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/change-password", verifyToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await Users.findOne({ where: { user_id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await user.update({ password_hash: hashedNewPassword });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* Register a new user (hashing password). */
router.post("/register", async (req, res) => {
  const { email, password_hash, first_name, last_name } = req.body;
  password = password_hash;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = await Users.create({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
