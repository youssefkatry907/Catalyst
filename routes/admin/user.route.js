let app = require("express").Router();
const userController = require("../../controllers/admin/user.controller");

app.get("/list", userController.list);
app.put("/update", userController.update);
app.delete("/delete", userController.delete);
app.post("/discount", userController.userDiscount);
app.post("/countryDiscount", userController.countryDiscount);

module.exports = app;

