const express = require("express");
const app = express();

const routes = require("../routes/index.route");
const cors = require("cors");
require("dotenv").config();

const executeBatchJobs = require("../utils/batchUpdate.util").executeJobs;
const databaseConnection = require("./database").connection;

executeBatchJobs();
databaseConnection();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type']
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);


module.exports = app;