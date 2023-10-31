const app = require('express').Router();

let catalogController = require('../../controllers/user/catalog.controller');
const uploadImage = require("../../helpers/uploader.helper")

app.get("/get", catalogController.get);
app.get("/list", catalogController.list);
app.post("/create", catalogController.create);
app.put("/update", catalogController.update);
app.delete("/delete", catalogController.delete);
app.get("/search", catalogController.search);
app.post("/image", uploadImage.single('image'), catalogController.uploadImage);

module.exports = app;