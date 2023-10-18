const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
require("dotenv").config();
const databaseConnection = require("./database").connection;

const routes = require("../routes/index.route");

databaseConnection();

app.use(routes);


module.exports = app;