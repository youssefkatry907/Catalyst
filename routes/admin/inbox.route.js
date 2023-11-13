let app = require('express').Router();

let inboxController = require('../../controllers/admin/inbox.controller');

app.post('/add', inboxController.add);

module.exports = app;