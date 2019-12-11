const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Skill', SkillSchema);
