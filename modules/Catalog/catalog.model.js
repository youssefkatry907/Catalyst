let mongoose = require('mongoose');

let catalogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true },
    details: { type: String, default: "none" },
    weight: { type: Number, required: true },
    pd: { type: Number, required: true },
    pt: { type: Number, required: true },
    rh: { type: Number, required: true },
    price: { type: Number },
    brand: { type: String },
    product: { type: String },
    manufacturer: { type: String, required: true },
    isHyprid: { type: String, default: "Hyprid" },
    image: { type: Object, default: null },
    status: { type: String, enum: ["approved", "pending", "refused"], default: "pending" }
})

let catalogModel = mongoose.model('catalogs', catalogSchema);

module.exports = catalogModel;