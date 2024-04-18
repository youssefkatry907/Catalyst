const app = require("express").Router();
const itemController = require("../../controllers/admin/item.controller");

let validator = require("../../helpers/validation.helper");
let { addItemValidation } = require("../../validation/Item/createItemValidation");

let uploadedImage = require("../../helpers/uploader.helper")

app.post("/create", validator(addItemValidation), itemController.create);
app.get("/list", itemController.list);
app.get("/get", itemController.get);
app.put("/update", itemController.update);
app.delete("/delete", itemController.delete);
app.post("/updateImage", uploadedImage.single("image"), itemController.updateImage);


module.exports = app;