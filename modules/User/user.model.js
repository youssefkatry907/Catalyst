let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 5;

let userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    number: { type: Number, required: true },
})

userSchema.pre('save', async function (next) {
    if (this.password) this.password = await bcrypt.hash(this.password, saltRounds);
    next();
})

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;