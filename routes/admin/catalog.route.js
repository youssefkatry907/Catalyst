const app = require('express').Router();

let catalogController = require('../../controllers/admin/catalog.controller');
const uploadImage = require("../../helpers/uploader.helper")

app.get("/get", catalogController.get);
app.get("/list", catalogController.list);
app.get("/search", catalogController.search);
app.post("/create", catalogController.create);
app.post("/image", uploadImage.single('image'), catalogController.uploadImage);
app.post("/approve", catalogController.approve);
app.post("/refuse", catalogController.refuse);
app.put("/update", catalogController.update);
app.delete("/delete", catalogController.delete);

module.exports = app;