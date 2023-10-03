let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 5;

let adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    number: { type: Number, required: true },
})

adminSchema.pre('save', async function (next) {
    if (this.password) this.password = await bcrypt.hash(this.password, saltRounds);
    next();
})

let adminModel = mongoose.model('admins', adminSchema);

module.exports = adminModel;