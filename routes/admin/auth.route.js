const app = require("express").Router();
const adminController = require("../../controllers/admin/auth.controller");
const { loginValidation, registerValidation } = require("../../validation/Admin/admin.authValidation")
const validator = require("../../helpers/validation.helper");

app.post("/register", validator(registerValidation), adminController.register)
app.post("/login", validator(loginValidation), adminController.login);


module.exports = app;