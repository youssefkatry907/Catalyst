let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 5;

let adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    country: { type: String, default: "none" },
    type: { type: String, default: "individual" },
    companyName: { type: String, default: "none" },
    role: { type: String, default: "admin" },
})

adminSchema.pre('save', async function (next) {
    if (this.password) this.password = await bcrypt.hash(this.password, saltRounds);
    next();
})

let adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;