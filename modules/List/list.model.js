let mongoose = require('mongoose');

// make list of items

let listSchema = mongoose.Schema({
    listName: { type: String, required: true },
    listOfItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'items' }],
    numOfItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
},
    {
        timeStamps: true
    }
);

let listModel = mongoose.model('lists', listSchema);

module.exports = listModel;