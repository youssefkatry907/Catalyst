let mongoose = require('mongoose');

let favoriteSchema = mongoose.Schema({
    favItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'items' }],
    createdAt: { type: Date, default: Date.now },
});

let favoriteModel = mongoose.model('favorites', favoriteSchema);

module.exports = favoriteModel;