const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moderate = {
    flaggedAt: {
        type: Schema.Types.Date,
        required: false,
    },
    flagResolvedAt: {
        type: Schema.Types.Date,
        required: false,
    },
    deletedAt: {
        type: Schema.Types.Date,
        required: false,
    },
};

module.exports = moderate;