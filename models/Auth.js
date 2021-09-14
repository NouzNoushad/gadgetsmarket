const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    }
});

module.exports = mongoose.model('ratingAuth', authSchema);