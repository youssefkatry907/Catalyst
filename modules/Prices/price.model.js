let mongoose = require('mongoose');

let priceSchema = mongoose.Schema({
    subscriptionType: { type: String, required: true },
    month: { type: Object },
    year: { type: Object },
    totalMonthlyPrice: { type: Number, required: true },
    totalYearlyPrice: { type: Number, required: true },
})

let priceModel = mongoose.model('prices', priceSchema);

module.exports = priceModel;