const mongoose = require('mongoose');

const SkillSchema = mongoose.Schema({
    name: String,
    url: String
});

module.exports = {
    SkillsModel: mongoose.model('Skill', SkillSchema),
    SkillSchema
};
