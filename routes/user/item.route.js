const app = require("express").Router();
const itemController = require("../../controllers/user/item.controller");
let validator = require("../../helpers/validation.helper");
let { addItemValidation } = require("../../validation/Item/createItemValidation");
const { uploadImage } = require("../../helpers/uploader.helper")
const upload = uploadImage("items");
// new commit

app.post("/add", validator(addItemValidation), itemController.add);
app.get("/list", itemController.list);
app.get("/get", itemController.get);
app.post("/image", upload.array('image', 1), itemController.uploadImage);
app.get("/search", itemController.search);


module.exports = app;