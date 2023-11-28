const app = require('express').Router();
let subscriptionController = require("../../controllers/admin/subscription.controller");

app.get('/get', subscriptionController.get);
app.get('/list', subscriptionController.list);
app.post('/approve', subscriptionController.approve);
app.post('/refuse', subscriptionController.refuse);
app.put('/update', subscriptionController.update);
app.delete('/delete', subscriptionController.delete);

module.exports = app;