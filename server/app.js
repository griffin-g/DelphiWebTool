var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nodemailer = require("nodemailer");
const cors = require("cors");

var app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://delphi-web-tool.web.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route setup
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var surveysRouter = require("./routes/surveysRouter");
var questionsRouter = require("./routes/questionsRouter");
var participantsRouter = require("./routes/participantsRouter");
var responsesRouter = require("./routes/responsesRouter");
var answerRouter = require("./routes/answerRouter");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/surveys", surveysRouter);
app.use("/questions", questionsRouter);
app.use("/participants", participantsRouter);
app.use("/responses", responsesRouter);
app.use("/answers", answerRouter);

// Health check route for Cloud Run
app.get("/health", async (req, res) => {
  try {
    // Try a simple query to test database connection
    await db.sequelize.query("SELECT 1+1 as result");
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(200).json({
      status: "ok",
      database: "disconnected",
      message: error.message,
    });
  }
});

// Error handling
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// First start the server to meet Cloud Run requirements
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Then attempt database connection
const db = require("./models");
(async () => {
  try {
    console.log("Attempting to connect to database...");
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await db.sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    // Don't exit - let the server keep running
    console.log("Server will continue running without database connection");
  }
})();

module.exports = app;
