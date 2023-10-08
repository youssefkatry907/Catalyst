const app = require("express").Router();
const itemController = require("../../controllers/user/item.controller");
const validator = require("../../helpers/validation.helper");
const { addItemValidation } = require("../../validation/item/addItemValidation");

app.post("/add", validator(addItemValidation), itemController.add);
app.get("/list", itemController.list);
app.get("/get", itemController.get);


module.exports = app;