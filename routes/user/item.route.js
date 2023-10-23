const app = require("express").Router();
const itemController = require("../../controllers/user/item.controller");
let validator = require("../../helpers/validation.helper");
let { addItemValidation } = require("../../validation/Item/createItemValidation");
const uploadImage = require("../../helpers/uploader.helper")
// new commit

app.post("/create", validator(addItemValidation), itemController.add);
app.get("/list", itemController.list);
app.get("/get", itemController.get);
app.post("/image", uploadImage.single('image'), itemController.uploadImage);
app.get("/search", itemController.search);


module.exports = app;