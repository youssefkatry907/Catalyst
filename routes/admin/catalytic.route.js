const app = require("express").Router();
const catalyticController = require("../../controllers/admin/catalytic.controller");

app.post("/create", catalyticController.add);
app.get("/list", catalyticController.list);

module.exports = app;