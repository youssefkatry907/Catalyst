let mongoose = require('mongoose');

let itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price : {type: Number, required: true},
    type: {type: String, required: true},
    weight: {type: Number, required: true},
});

let itemModel = mongoose.model('items', itemSchema);

module.exports = itemModel;