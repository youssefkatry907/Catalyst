const app = require("express").Router();
const metalController = require("../../controllers/admin/metal.controller");

app.post("/add", metalController.add);
app.post("/add-history", metalController.addHistory);
app.get("/latest", metalController.getLatest);

module.exports = app;