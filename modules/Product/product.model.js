let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

let productModel = mongoose.model('Product', productSchema);

module.exports = productModel;