let app = require("express").Router();
const brandController = require("../../controllers/admin/brand.controller");

app.post("/create", brandController.create);
app.get("/list", brandController.list);


module.exports = app;

