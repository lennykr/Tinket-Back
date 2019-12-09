const mongoose = require('mongoose');
const Skill = require('./Skill');

const CompanySchema = mongoose.Schema({
    name: String,
    contactInfo: {
        email: String,
        phoneNumber: String,
        linkedIn: String,
    },
    location: {
        country: String,
        city: String,
        street: String,
        postalCode: String,
    },
    tags: [{
        name: String,
        url: String
    }],
    bio: String,
    review: Number,
    role: String
});

module.exports = mongoose.model('Company', CompanySchema);