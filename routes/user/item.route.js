const app = require("express").Router();
const itemController = require("../../controllers/user/item.controller");
let validator = require("../../helpers/validation.helper");
let { addItemValidation } = require("../../validation/Item/createItemValidation");

app.post("/add", validator(addItemValidation), itemController.add);
app.get("/list", itemController.list);
app.get("/get", itemController.get);


module.exports = app;