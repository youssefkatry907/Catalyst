const express = require("express");
const app = express();

const routes = require("../routes/index.route");
const { handleFileUploadErrors } = require("../helpers/uploader.helper");
const cors = require("cors");
require("dotenv").config();

const databaseConnection = require("./database").connection;

databaseConnection();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type']
};


// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", { upload_preset: "my_preset" }, (error, result) => {
//     console.log(result, error);
// });

app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);
// app.use(handleFileUploadErrors);


module.exports = app;