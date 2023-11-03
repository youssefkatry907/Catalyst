const app = require("express").Router();
const sliderController = require("../../controllers/admin/slider.controller");

app.post("/create", sliderController.add);
app.get("/list", sliderController.list);

module.exports = app;