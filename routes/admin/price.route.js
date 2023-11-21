const app = require('express').Router();

let priceController = require("../../controllers/admin/price.controller");

app.post('/add', priceController.add);
app.get('/get', priceController.get);

module.exports = app;