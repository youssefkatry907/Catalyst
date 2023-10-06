const app = require("express").Router();
const userController = require("../../controllers/user/auth.controller");
const { loginValidation, registerValidation, sendEmailValidation } = require("../../validation/User/user.createValidation.js")
const validator = require("../../helpers/validation.helper");


app.post("/login", validator(loginValidation), userController.login);
app.post("/register", validator(registerValidation), userController.register)
app.post("/recovery", validator(sendEmailValidation), userController.generateRecoveryCode);


module.exports = app;