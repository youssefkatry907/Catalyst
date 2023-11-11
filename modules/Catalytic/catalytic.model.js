let mongoose = require('mongoose');

let catalyticSchema = mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, unique: true },
});

let catalyticModel = mongoose.model('catalytic', catalyticSchema);

module.exports = catalyticModel;