const app = require("express").Router();
const sliderController = require("../../controllers/admin/slider.controller");

app.post("/create", sliderController.add);
app.get("/list", sliderController.list);
// req.params.idx
app.delete("/delete/:idx", sliderController.delete);

module.exports = app;