let mongoose = require('mongoose');

let itemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    isElectronic: { type: Boolean, default: false },
    type: { type: String },
    weight: { type: Number },
    palladium: { type: Number },
    platinum: { type: Number },
    rhodium: { type: Number },
    brand: { type: String },
    product: { type: String },
    catalyticProduct: { type: String },
    image: { type: Object, default: null },
    manufacturer: { type: String, default: "none" },
    details: { type: String, default: "none" },
    isHyprid: { type: String, default: "Hyprid" },
    isfavorite: { type: Boolean, default: false },
    searchCount: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
});

let itemModel = mongoose.model('items', itemSchema);

module.exports = itemModel;