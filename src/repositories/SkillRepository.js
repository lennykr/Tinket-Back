const Skill = require('../models/Skill');
const BaseRepository = require('./BaseRepository');

class SkillRepository extends BaseRepository {
    constructor() {super(Skill);}

    readAll() {
        return this.model.find({});
    }
}

module.exports = SkillRepository;
