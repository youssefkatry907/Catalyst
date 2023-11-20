let express = require("express");
const app = express();

let checkToken = require("../../helpers/jwt.helper").verifyToken;
const allowedUsers = ["user", "admin"]
// const allowedAdmins = ["admin"]

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const itemRoutes = require("./item.route");
const listRoutes = require("./list.route");
const favoriteRoutes = require("./favorite.route");
const catalogRoutes = require("./catalog.route");
const metalRoutes = require("./metal.route");
const inboxRoutes = require("./inbox.route");

console.log("Users: ",allowedUsers[0]);

app.use(authRoutes);
app.use(checkToken(allowedUsers), userRoutes);
app.use("/item", checkToken(allowedUsers), itemRoutes);
 //app.use("/item", checkToken(allowedAdmins), itemRoutes);
app.use("/list", checkToken(allowedUsers), listRoutes);
app.use("/favorite", checkToken(allowedUsers), favoriteRoutes);
app.use("/catalog", checkToken(allowedUsers), catalogRoutes);
app.use("/metal", checkToken(allowedUsers), metalRoutes);
app.use("/inbox", checkToken(allowedUsers), inboxRoutes);

module.exports = app;