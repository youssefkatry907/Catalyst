const express = require("express");
const app = express();
const databaseConnection = require("./database").connection;
const routes = require("../routes/index.route");
require("dotenv").config();
//const cors = require("cors");


databaseConnection();


//app.use(cors());
app.use(express.json());
app.use(routes);


module.exports = app;