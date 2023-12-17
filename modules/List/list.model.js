let mongoose = require('mongoose');

let listSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    listName: { type: String, required: true },
    listOfItems: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'items' },
            quantity: { type: Number, default: 1 },
            price: { type: Number, default: 0 },
        }
    ],
    numOfItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    type: { type: String, default: "none" },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
},
    {
        timeStamps: true
    }
);

let listModel = mongoose.model('lists', listSchema);

module.exports = listModel;