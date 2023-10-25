let mongoose = require('mongoose');

let listSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    listName: { type: String, required: true },
    listOfItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'items' }],
    numOfItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    type: { type: String, default: "null" },
    createdAt: { type: Date, default: Date.now },
},
    {
        timeStamps: true
    }
);

let listModel = mongoose.model('lists', listSchema);

module.exports = listModel;