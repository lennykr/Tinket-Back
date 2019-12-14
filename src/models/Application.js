const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    contacted: {
        type: Boolean,
        required: true,
        default: () => false,
    },
    maker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignment: {
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true,
    }
});

module.exports = mongoose.model('Application', applicationSchema);
