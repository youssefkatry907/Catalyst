let mongoose = require('mongoose');

let subscriptionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    userName: { type: String, required: true },
    subscriptionType: { type: String, required: true },
    broSubscription: {type: Object, default: null},
    paymentMethod: { type: String, required: true },
    accountNumber: { type: String, required: true },
    paymentHistory: { type: String, required: true},
    cost: { type: Number, required: true },
    status: { type: String,enum: ["approved", "pending", "refused"], default: "pending" },
})

let subscriptionModel = mongoose.model('subscriptions', subscriptionSchema);

module.exports = subscriptionModel;