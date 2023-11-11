let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, unique: true }
});

let productModel = mongoose.model('Product', productSchema);

module.exports = productModel;