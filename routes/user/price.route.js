const app = require('express').Router();
let priceController = require("../../controllers/user/prices.controller");

app.get('/get', priceController.get);

module.exports = app;