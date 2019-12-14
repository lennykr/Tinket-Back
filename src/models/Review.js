const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    creator: {
        anonymous: {
            type: Boolean,
            default: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        }
    },
    reviewed: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: String,
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Review', reviewSchema);
