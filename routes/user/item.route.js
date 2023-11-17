const app = require("express").Router();
const itemController = require("../../controllers/user/item.controller");
let validator = require("../../helpers/validation.helper");
let { addItemValidation } = require("../../validation/Item/createItemValidation");
const uploadImage = require("../../helpers/uploader.helper")
// new commit

app.post("/create", validator(addItemValidation), itemController.create);
app.get("/list", itemController.list);
app.get("/get", itemController.get);
app.post("/image", uploadImage.single('image'), itemController.upload);
app.get("/search", itemController.search);
app.get("/most-searched", itemController.mostSearched);


module.exports = app;