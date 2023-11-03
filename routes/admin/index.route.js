let express = require("express");
const app = express();

let checkToken = require("../../helpers/jwt.helper").verifyToken;
const allowedUsers = ["admin"]

const authRoutes = require("./auth.route");
const adminRoutes = require("./admin.route");
const itemRoutes = require("./item.route");
const sliderRoutes = require("./slider.route");
const brandRoutes = require("./brand.route");
const productRoutes = require("./product.route");

app.use(authRoutes);
app.use(checkToken(allowedUsers), adminRoutes);
app.use("/item", checkToken(allowedUsers), itemRoutes);
app.use("/slider", checkToken(allowedUsers), sliderRoutes);
app.use("/brand", checkToken(allowedUsers), brandRoutes);
app.use("/product", checkToken(allowedUsers), productRoutes);


module.exports = app;