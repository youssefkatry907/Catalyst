const express = require("express");
const app = express();
const cloudinary = require('cloudinary').v2;
          
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

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
app.use(handleFileUploadErrors);


module.exports = app;