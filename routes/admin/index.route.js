let express = require("express");
const app = express();

let checkToken = require("../../helpers/jwt.helper").verifyToken;
const allowedUsers = ["admin"]

const authRoutes = require("./auth.route");
const adminRoutes = require("./admin.route");
const itemRoutes = require("./item.route");
const sliderRoutes = require("./slider.route");

app.use(authRoutes);
app.use(checkToken(allowedUsers), adminRoutes);
app.use("/item", checkToken(allowedUsers), itemRoutes);
app.use("/slider", checkToken(allowedUsers), sliderRoutes);


module.exports = app;