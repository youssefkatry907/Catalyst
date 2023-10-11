let express = require("express");
const app = express();

// let checkToken = require("../../helpers/jwt.helper").verifyToken;
// const allowedUsers = ["user"]

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const itemRoutes = require("./item.route");

app.use(authRoutes);
app.use(userRoutes);
app.use("/item", itemRoutes);

module.exports = app;