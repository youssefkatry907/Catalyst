const app = require('express').Router();
let subscriptionController = require("../../controllers/user/subscription.controller");

app.post('/create', subscriptionController.create);

module.exports = app;