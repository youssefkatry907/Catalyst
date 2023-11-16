let mongoose = require('mongoose');

let metalSchema = new mongoose.Schema({
    pd: { type: Number, default: 0 },
    pt: { type: Number, default: 0 },
    rh: { type: Number, default: 0 },
    pdDaily: [{ type: Number }],
    ptDaily: [{ type: Number }],
    rhDaily: [{ type: Number }],
    pdHistory: [{ type: Number }],
    ptHistory: [{ type: Number }],
    rhHistory: [{ type: Number }],
    date: { type: Date, default: Date.now }
});

let metalModel = mongoose.model('metals', metalSchema);

module.exports = metalModel;