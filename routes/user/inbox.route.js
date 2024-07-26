let app = require('express').Router();
const { contactUsValidation } = require("../../validation/Inbox/inboxValidation");
let inboxController = require('../../controllers/user/inbox.controller');
const validator = require("../../helpers/validation.helper");

app.get('/get', inboxController.get);
app.post('/contactUs', validator(contactUsValidation), inboxController.contactUs);

module.exports = app;