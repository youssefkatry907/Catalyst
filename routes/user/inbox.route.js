let app = require('express').Router();

let inboxController = require('../../controllers/user/inbox.controller');

app.get('/get', inboxController.get);
app.post('/contactUs', inboxController.contactUs);

module.exports = app;