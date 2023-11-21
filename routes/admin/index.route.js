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
const catalyticRoutes = require("./catalytic.route");
const catalogRoutes = require("./catalog.route");
const userRoutes = require("./user.route");
const metalRoutes = require("./metal.route");
const inboxRoutes = require("./inbox.route");
const subscriptionRoutes = require("./subscription.route");
const priceRoutes = require("./price.route");

app.use(authRoutes);
app.use(checkToken(allowedUsers), adminRoutes);
app.use("/item", checkToken(allowedUsers), itemRoutes);
app.use("/slider", checkToken(allowedUsers), sliderRoutes);
app.use("/brand", checkToken(allowedUsers), brandRoutes);
app.use("/product", checkToken(allowedUsers), productRoutes);
app.use("/catalytic", checkToken(allowedUsers), catalyticRoutes);
app.use("/catalog", checkToken(allowedUsers), catalogRoutes);
app.use("/user", checkToken(allowedUsers), userRoutes);
app.use("/metal", checkToken(allowedUsers), metalRoutes);
app.use("/inbox", checkToken(allowedUsers), inboxRoutes);
app.use("/subscription", checkToken(allowedUsers), subscriptionRoutes);
app.use("/price", checkToken(allowedUsers), priceRoutes);


module.exports = app;