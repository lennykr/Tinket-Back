const mongoose = require('mongoose');

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
    tags: Array<String>[],
    bio: String,
    review: Number,
    role: String
});

module.exports = mongoose.model('Company', CompanySchema);