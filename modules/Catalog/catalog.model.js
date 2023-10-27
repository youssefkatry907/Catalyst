let mongoose = require('mongoose');

let catalogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: { type: String, default: "none" },
    weight: { type: Number, required: true },
    brand: { type: String },
    image: { type: Object, default: null },
    status: { type: String, enum: ["approved", "pending", "refused"], default: "pending" }
})

let catalogModel = mongoose.model('catalogs', catalogSchema);

module.exports = catalogModel;