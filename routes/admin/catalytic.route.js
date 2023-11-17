const app = require("express").Router();
const catalyticController = require("../../controllers/admin/catalytic.controller");

app.post("/create", catalyticController.add);
app.get("/list", catalyticController.list);
app.put("/update", catalyticController.update)
app.delete("/delete", catalyticController.delete)

module.exports = app;