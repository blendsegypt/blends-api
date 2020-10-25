// var express = require("express");
import Express from "express";
import Path from "path";
import CookieParser from "cookie-parser";
import Logger from "morgan";
import sequelize from "./db";

var App = Express();

App.use(Logger("dev"));
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(CookieParser());
App.use(Express.static(Path.join(__dirname, "public")));

export default App;
