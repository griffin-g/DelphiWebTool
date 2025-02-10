var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const nodemailer = require("nodemailer");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var surveysRouter = require("./routes/surveysRouter");
var questionsRouter = require("./routes/questionsRouter");
var participantsRouter = require("./routes/participantsRouter");
var responsesRouter = require("./routes/responsesRouter");
var answerRouter = require("./routes/answerRouter");

const cors = require("cors");
var app = express();
const db = require("./models");
const { error } = require("console");
// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render("error");
  //res.send(error);
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001.");
  });
});

module.exports = app;

