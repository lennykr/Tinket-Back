const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    nickname: String,
    firstname: String,
    lastname: String,
    dateOfBirth: Date,
    skills: Array<String>[], 
    bio: String,
    experience: String,
    contactInfo: {
        email: String,
        phoneNumber: String,
        linkedIn: String,
    },
    review: Number,
    role: String
});

module.exports = mongoose.model('Student', StudentSchema);