const app = require('express').Router();
const metalController = require('../../controllers/user/metal.controller');

app.get('/get', metalController.get);

module.exports = app;