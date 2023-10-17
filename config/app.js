const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require("dotenv").config();
const databaseConnection = require("./database").connection;

const routes = require("../routes/index.route");



//const cors = require("cors");


databaseConnection();


//app.use(cors());

app.use(routes);


module.exports = app;