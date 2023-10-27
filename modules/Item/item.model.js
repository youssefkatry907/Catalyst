let mongoose = require('mongoose');

let itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    image: { type: Object, default: null },
    manufacturer: { type: String, default: "none" },
    details: { type: String, default: "none" },
    isfavorite: { type: Boolean, default: false },
    searchCount: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
});

let itemModel = mongoose.model('items', itemSchema);

module.exports = itemModel;