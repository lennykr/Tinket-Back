const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    candidate: [{
        contacted: {
            type: Boolean,
            required: true,
            default: () => false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }],
});

module.exports = mongoose.model('Assignment', AssignmentSchema);