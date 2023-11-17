let app = require('express').Router();

let inboxController = require('../../controllers/admin/inbox.controller');

app.post('/add', inboxController.add);
app.get('/list', inboxController.list);

module.exports = app;