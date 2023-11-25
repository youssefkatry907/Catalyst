let app = require("express").Router();
const userController = require("../../controllers/admin/user.controller");

app.get("/list", userController.list);
app.put("/update", userController.update);
app.delete("/delete", userController.delete);
app.post("/hiddenDiscount", userController.userDiscount);
app.post("/appDiscount", userController.appDiscount);
app.post("/countryDiscount", userController.countryDiscount);
app.post("/exchangeRate", userController.userExchangeRate);

module.exports = app;

