let app = require("express").Router();
const userController = require("../../controllers/user/user.controller");

app.get("/get", userController.getUser);
app.put("/update", userController.updateProfile);
app.delete("/delete", userController.delete);

module.exports = app;

