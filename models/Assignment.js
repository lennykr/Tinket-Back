const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: Array<String>[],
    location: {
        country: String,
        city: String,
        street: String,
        postalCode: String,
    }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);