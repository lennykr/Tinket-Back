const mongoose = require('mongoose');

const SkillsSchema = mongoose.Schema({
    skills: Array<String>[]
});

module.exports = mongoose.model('Skills', SkillsSchema);