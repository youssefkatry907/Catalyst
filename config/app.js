const express = require("express");
const app = express();
//const cors = require("cors");
const databaseConnection = require("./database").connection;
require("dotenv").config();


databaseConnection();

//app.use(cors());
app.use(express.json());

module.exports = app;