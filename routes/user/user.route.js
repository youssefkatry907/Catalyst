let app = require("express").Router();
const userController = require("../../controllers/user/user.controller");

app.get("/get", userController.getUser);

module.exports = app;

