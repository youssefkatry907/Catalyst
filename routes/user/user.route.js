let app = require("express").Router();
const userController = require("../../controllers/user/user.controller");
const { resetPasswordValidation } = require("../../validation/User/user.authValidation")
const validator = require("../../helpers/validation.helper");


app.get("/get", userController.getUser);
app.put("/update", userController.updateProfile);
app.put("/changePassword", validator(resetPasswordValidation), userController.changePassword);
app.delete("/delete", userController.delete);

module.exports = app;

