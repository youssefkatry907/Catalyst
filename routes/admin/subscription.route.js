const app = require('express').Router();
let subscriptionController = require("../../controllers/admin/subscription.controller");

app.get('/get', subscriptionController.get);
app.get('/list', subscriptionController.list);

module.exports = app;