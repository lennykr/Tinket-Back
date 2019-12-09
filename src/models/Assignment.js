const mongoose = require('mongoose');
const Skill = require('./Skill');

const AssignmentSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [{
        name: String,
        url: String
    }],
    location: {
        country: String,
        city: String,
        street: String,
        postalCode: String,
    }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);