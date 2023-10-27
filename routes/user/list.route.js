const app = require("express").Router();
const listController = require("../../controllers/user/list.controller");
let validator = require("../../helpers/validation.helper");
let { createListValidation } = require("../../validation/List/createListValidation");

app.get("/get", listController.getList);
app.post("/create", validator(createListValidation), listController.create);
app.post("/addItem", listController.addItem);
app.delete("/removeItem", listController.removeItem);
app.put("/update", listController.updateQuantity);
app.delete("/delete", listController.delete);

module.exports = app;