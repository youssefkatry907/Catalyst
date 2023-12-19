const app = require("express").Router();
const userController = require("../../controllers/user/auth.controller");
const { loginValidation, registerValidation } = require("../../validation/User/user.authValidation")
const validator = require("../../helpers/validation.helper");

app.post("/register", validator(registerValidation), userController.register)
app.post("/login", validator(loginValidation), userController.login);


module.exports = app;