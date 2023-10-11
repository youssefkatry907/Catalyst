let mongoose = require('mongoose');

let calculatorSchema = mongoose.Schema({
    pdGram: { type: Number, required: true },
    ptGram: { type: Number, required: true },
    pdPpm: { type: Number, required: true },
    ptPpm: { type: Number, required: true },
    rhGram: { type: Number, required: true },
    rhPpm: { type: Number, required: true },
    weight: { type: Number, required: true },
    exchangeRate: { type: Number, default: 1.0 },
    price: { type: Number, default: 0 }
});

let calculatorModel = mongoose.model('calculators', calculatorSchema);

module.exports = calculatorModel;