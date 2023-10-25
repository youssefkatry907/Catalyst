const app = require('express').Router();

const favoriteController = require('../../controllers/user/favorite.controller');

app.get("/get", favoriteController.get);
app.post("/update", favoriteController.updateFavList);

module.exports = app;
