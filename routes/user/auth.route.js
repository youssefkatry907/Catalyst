const app = require("express").Router();
const userController = require("../../controllers/user/auth.controller");
const { loginValidation, registerValidation, sendEmailValidation, resetPasswordValidation } = require("../../validation/User/user.authValidation")
const validator = require("../../helpers/validation.helper");

app.post("/register", validator(registerValidation), userController.register)
app.post("/login", validator(loginValidation), userController.login);
app.put("/logout", userController.logout);
app.put("/update", userController.updateProfile);
app.put("/changePassword", validator(resetPasswordValidation), userController.changePassword);
app.post("/recovery", validator(sendEmailValidation), userController.generateRecoveryCode);
app.delete("/delete", userController.delete);


module.exports = app;