const mongoose = require('mongoose')

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
        minlength: 5,
        maxlength: 20,
        unique: true,
    },
    // date: {
        
    // },
}, {collection: 'users'})

module.exports = mongoose.model('users',userSchema)