const app = require("express").Router();
const productController = require("../../controllers/admin/product.controller");

app.post("/create", productController.add);
app.get("/list", productController.list);
app.put("/update", productController.update)
app.delete("/delete", productController.delete)

module.exports = app;