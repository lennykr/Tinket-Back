const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moderate = require('./_moderate');

const AssignmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requiredSkills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
    }],
    location: {
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
    },
    open: {
        type: Boolean,
        required: true
    },
    archivedAt: {
        type: Date
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application',
        required: false,
    }],

    ...moderate
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
