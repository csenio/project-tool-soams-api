var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

var app = express();

console.log(config);

mongoose.connect(
  `mongodb://${config.mongodb}/project-management`,
  { useNewUrlParser: true }
);

app.use(
  cors({
    origin: `${config.frontend}`,
    credentials: true
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", require("./routes/index"));
app.use("/", require("./routes"));

module.exports = app;
