const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
       
    },
    message: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ratingRef', ratingSchema);