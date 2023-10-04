const app = require("express").Router();
const userController = require("../../controllers/user/auth.controller");
const { loginValidation, registerValidation } = require("../../validation/User/user.createValidation.js")
const validator = require("../../helpers/validation.helper");


app.post("/login", validator(loginValidation), userController.login);
app.post("/register", validator(registerValidation), userController.register)


module.exports = app;