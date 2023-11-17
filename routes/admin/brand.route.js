let app = require("express").Router();
const brandController = require("../../controllers/admin/brand.controller");
const uploadImage = require("../../helpers/uploader.helper")

app.post("/create", brandController.create);
app.get("/list", brandController.list);
app.post("/image", uploadImage.single('image'), brandController.uploadImage);
app.put("/update", brandController.update)
app.delete("/delete", brandController.delete)


module.exports = app;

