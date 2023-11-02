let mongoose = require("mongoose");

let sliderSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },
    listOfSliders: [{ type: String }],
});

let sliderModel = mongoose.model('sliders', sliderSchema);

module.exports = sliderModel;