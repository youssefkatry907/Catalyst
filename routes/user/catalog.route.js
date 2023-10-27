const app = require('express').Router();

let catalogController = require('../../controllers/user/catalog.controller');

app.get("/get", catalogController.get);
app.get("/list", catalogController.list);
app.post("/create", catalogController.create);
app.put("/update", catalogController.update);

module.exports = app;