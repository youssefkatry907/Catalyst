const app = require("express").Router();
const userController = require("../../controllers/user/auth.controller");
const { loginValidation, registerValidation, sendEmailValidation } = require("../../validation/User/user.authValidation")
const validator = require("../../helpers/validation.helper");

app.post("/register", validator(registerValidation), userController.register)
app.post("/login", validator(loginValidation), userController.login);
app.put("/logout", userController.logout);
app.post("/recovery", validator(sendEmailValidation), userController.generateRecoveryCode);
app.post("/sms", userController.generateOtpCode);


module.exports = app;