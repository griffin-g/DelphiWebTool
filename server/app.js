var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nodemailer = require("nodemailer");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var surveysRouter = require("./routes/surveysRouter");
var questionsRouter = require("./routes/questionsRouter");
var participantsRouter = require("./routes/participantsRouter");
var responsesRouter = require("./routes/responsesRouter");
var answerRouter = require("./routes/answerRouter");

var app = express();
const db = require("./models");
const { error } = require("console");

// CORS configuration - this must come before other middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Other middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/surveys", surveysRouter);
app.use("/questions", questionsRouter);
app.use("/participants", participantsRouter);
app.use("/responses", responsesRouter);
app.use("/answers", answerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

// Database connection and server start
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001.");
  });
});

module.exports = app;