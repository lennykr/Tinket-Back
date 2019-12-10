const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    name: {
        Type: String,
        Required: true,
    },
    url: {
        Type: String,
        Required: true,
    }
});

module.exports = mongoose.model('Skill', SkillSchema);
