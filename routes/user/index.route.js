let express = require("express");
const app = express();

let checkToken = require("../../helpers/jwt.helper").verifyToken;
const allowedUsers = ["user", "admin"]

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const itemRoutes = require("./item.route");
const listRoutes = require("./list.route");
const favoriteRoutes = require("./favorite.route");
const catalogRoutes = require("./catalog.route");
const metalRoutes = require("./metal.route");
const inboxRoutes = require("./inbox.route");
const subscriptionRoutes = require("./subscription.route");
const priceRoutes = require("./price.route");


app.use(authRoutes);
app.use(checkToken(allowedUsers), userRoutes);
app.use("/item", checkToken(allowedUsers), itemRoutes);
app.use("/list", checkToken(allowedUsers), listRoutes);
app.use("/favorite", checkToken(allowedUsers), favoriteRoutes);
app.use("/catalog", checkToken(allowedUsers), catalogRoutes);
app.use("/metal", checkToken(allowedUsers), metalRoutes);
app.use("/inbox", checkToken(allowedUsers), inboxRoutes);
app.use("/subscription", checkToken(allowedUsers), subscriptionRoutes);
app.use("/price", checkToken(allowedUsers), priceRoutes);

module.exports = app;