var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { Sequelize } = require("sequelize");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const sequelize = new Sequelize("blends", "root", "", {
  host: "localhost",
  dialect: "postgres",
});

(async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello Worldzzz!");
});

module.exports = app;
