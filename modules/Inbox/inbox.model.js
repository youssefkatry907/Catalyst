let mongoose = require('mongoose');

let inboxSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    listOfNotes: [{ type: String, default: "none" }]
}, { timestamps: true })

let inboxModel = mongoose.model('inboxes', inboxSchema);

module.exports = inboxModel;