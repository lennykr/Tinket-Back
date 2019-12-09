const mongoose = require('mongoose');
const Skill = require('./Skill');
const bcrypt = require("bcrypt");

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

/**
 * Hash the password before saving the user model
 */
UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

module.exports = mongoose.model('User', UserSchema);
