const app = require("express").Router();
const adminController = require("../../controllers/user/auth.controller");
const { loginValidation, registerValidation } = require("../../validation/User/user.authValidation")
const validator = require("../../helpers/validation.helper");

app.post("/register", validator(registerValidation), adminController.register)
app.post("/login", validator(loginValidation), adminController.login);


module.exports = app;