let mongoose = require("mongoose");

let sliderSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },
    listOfSliders: [{ type: String }],
});

let sliderModel = mongoose.model('sliders', sliderSchema);

module.exports = sliderModel;