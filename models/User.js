const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nickname: String,
    firstname: String,
    lastname: String,
    password: String,
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
});

module.exports = mongoose.model('User', UserSchema);