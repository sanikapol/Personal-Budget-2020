const mongoose = require('mongoose')

const colorValidator = (v) => (/^#[A-Fa-f0-9]{6}$/i).test(v)

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        trim: true,
        required: true,
    },
    expense: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        maxlength: 7,
        validate: colorValidator,
        unique: true,
    },
    user: {
        type: String,
        trim: true,
        required: true,
    },
}, {collection: 'budget_2020'})

module.exports = mongoose.model('budget_2020',budgetSchema)