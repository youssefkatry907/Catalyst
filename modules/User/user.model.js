let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 5;

let userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    country: { type: String, default: "none" },
    type: { type: String, default: "individual" },
    companyName: { type: String, default: "none" },
    role: { type: String, default: "user" },
    favListId: { type: mongoose.Schema.Types.ObjectId, ref: 'favorites', default: null },
})

userSchema.pre('save', async function (next) {
    if (this.password) this.password = await bcrypt.hash(this.password, saltRounds);
    next();
})

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;