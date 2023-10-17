const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const databaseConnection = require("./database").connection;

const routes = require("../routes/index.route");

databaseConnection();

app.use(routes);


module.exports = app;