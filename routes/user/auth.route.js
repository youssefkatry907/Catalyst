const app = require("express").Router();
const userController = require("../../controllers/user/auth.controller");
const { loginValidation } = require("../../validation/User/user.createValidation.js")
const validator = require("../../helpers/validation.helper");


app.post("/login", validator(loginValidation), userController.login);



module.exports = app;