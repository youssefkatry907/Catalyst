let app = require("express").Router();
const adminController = require("../../controllers/admin/admin.controller");
const { resetPasswordValidation } = require("../../validation/User/user.authValidation")
const validator = require("../../helpers/validation.helper");


app.get("/get", adminController.getAdmin);
app.put("/update", adminController.updateProfile);
app.put("/changePassword", validator(resetPasswordValidation), adminController.changePassword);
app.delete("/delete", adminController.delete);

module.exports = app;