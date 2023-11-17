let mongoose = require("mongoose");

let brandSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },
    name: { type: String, required: true, unique: true },
    details: { type: String },
    image: { type: Object, default: null },
});

let brandModel = mongoose.model('brands', brandSchema);

module.exports = brandModel;