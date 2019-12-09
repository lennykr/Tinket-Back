const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    name: String,
    url: String
});

module.exports = mongoose.model('Skill', SkillSchema);