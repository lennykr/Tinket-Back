const mongoose = require('mongoose');
const Skill = require('./Skill');

const UserSchema = mongoose.Schema({
    nickname: String,
    firstname: String,
    lastname: String,
    password: String,
    dateOfBirth: Date,
    skills: Array<Skill>[], 
    bio: String,
    experience: String,
    contactInfo: {
        email: String,
        phoneNumber: String,
        linkedIn: String,
    },
    review: Number,
    role: String,
});

module.exports = mongoose.model('User', UserSchema);