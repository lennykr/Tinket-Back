// this import is required for .populate() to work
const Skill = require('../models/Skill');
const Assignment = require('../models/Assignment');
const BaseRepository = require('./BaseRepository');

class AssignmentRepository extends BaseRepository {
    constructor() {super(Assignment);}

    readAllWhere(conditions) {
        return this.model.find(conditions).populate('requiredSkills');
    }
}

module.exports = AssignmentRepository;
