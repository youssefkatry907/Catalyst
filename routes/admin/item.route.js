const app = require("express").Router();
const itemController = require("../../controllers/admin/item.controller");
let validator = require("../../helpers/validation.helper");
let { addItemValidation } = require("../../validation/Item/createItemValidation");

app.post("/create", validator(addItemValidation), itemController.create);
app.get("/list", itemController.list);
app.get("/get", itemController.get);
app.put("/update", itemController.update);
app.delete("/delete", itemController.delete);


module.exports = app;