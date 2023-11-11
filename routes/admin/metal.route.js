const app = require("express").Router();
const metalController = require("../../controllers/admin/metal.controller");

app.post("/add", metalController.add);

module.exports = app;