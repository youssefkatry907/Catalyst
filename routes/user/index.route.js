let express = require("express");
const app = express();

// let checkToken = require("../../helpers/jwt.helper").verifyToken;
// const allowedUsers = ["user"]

const authRoutes = require("./auth.route");

app.use(authRoutes);

module.exports = app;