let express = require("express");
const app = express();

let checkToken = require("../../helpers/jwt.helper").verifyToken;
const allowedUsers = ["user"]

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const itemRoutes = require("./item.route");
const listRoutes = require("./list.route");
const favoriteRoutes = require("./favorite.route");

app.use(authRoutes);
app.use(checkToken(allowedUsers), userRoutes);
app.use("/item", checkToken(allowedUsers), itemRoutes);
app.use("/list", checkToken(allowedUsers), listRoutes);
app.use("/favorite", checkToken(allowedUsers), favoriteRoutes);

module.exports = app;