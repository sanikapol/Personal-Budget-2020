const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60,
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 60,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
        unique:true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 20,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        maxlength: 150,
    },
}, {collection: 'users'})

userSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}
userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}
userSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}

userSchema.methods.generateJwtRefreshToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}

module.exports = mongoose.model('users',userSchema)

userSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});